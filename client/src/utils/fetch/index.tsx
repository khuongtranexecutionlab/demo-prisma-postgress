import { ENDPOINT_SERVICE } from '@/global/constant'
import { IResponse } from './models'
import { MethodsTypes, EMethod } from './types'

export const Method = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Head: 'HEAD',
}

export function Call<T>(method: MethodsTypes, apiPath: string, data: object = {}) {
  if (method === EMethod.Get) return Get<T>(apiPath)
  else if (method === EMethod.Post) return Post<T>(apiPath, data)
  else if (method === EMethod.Put) return Put<T>(apiPath, data)
  else if (method === EMethod.Delete) return Delete<T>(apiPath)
  else if (method === EMethod.Head) return Head<T>(apiPath)
}

export function Get<T>(apiPath: string, header?: object) {
  return call<T>(Method.Get, apiPath, header)
}
export function Post<T>(apiPath: string, data: object = {}) {
  return call<T>(Method.Post, apiPath, data)
}
export function Put<T>(apiPath: string, data: object = {}) {
  return call<T>(Method.Put, apiPath, data)
}
export function Delete<T>(apiPath: string, data: object = {}) {
  return call<T>(Method.Delete, apiPath, data)
}
export function Head<T>(apiPath: string) {
  return call<T>(Method.Head, apiPath)
}

// Define an array of functions that returns a promise
let request: Promise<any> | null = null
// Flag to check if the token is being refreshed

// Function to call the API with the specified method, API path, data, and header
async function call<T>(method: string, apiPath: string, data: object = {}, header?: object) {
  // Define the request initialization object
  let requestInit = {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  } as RequestInit

  // If the method is not GET or HEAD, stringify the data and add it to the request initialization object
  if (method !== Method.Get && method !== Method.Head) {
    requestInit.body = JSON.stringify(data)
  }

  // Call the API with the specified method and API path
  let response = await fetch(`http://${ENDPOINT_SERVICE + apiPath}`, requestInit)

  // If the response status is 401 (Unauthorized), check if the token is being refreshed
  if (response.status === 401) {
    request = request ? request : refreshToken()

    let re = await request
    request = null

    if (re.success) response = await fetch(`http://${ENDPOINT_SERVICE + apiPath}`, requestInit)
    else throw new Error('')
  }

  let body = await response.text()
  let data_1: IResponse<T> | null = null
  if (body) {
    data_1 = JSON.parse(body, (key, value_1) => {
      if (value_1) {
        let s = value_1 as string

        if (s.indexOf && s.endsWith)
          if (s.indexOf('T') && s.endsWith('Z')) {
            let d = new Date(value_1)

            if (d instanceof Date && !isNaN(d.getTime())) return d
          }
      }

      return value_1
    })

    if (
      data_1 &&
      (data_1.success === undefined || data_1.success === null) &&
      (data_1.error === undefined || data_1.error === null)
    )
      data_1.success = true

    return data_1
  }
}

// Function to refresh the token
async function refreshToken() {
  // Call the refresh token API and store the new token
  return call(Method.Get, `/api/auth/refreshtoken`)
}
