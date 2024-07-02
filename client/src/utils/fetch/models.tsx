export interface IResponse<T> extends IResponseResult {
  data: T
}
export interface IPaging<T> {
  total: number
  data: T[]
  page: number
  limit: number
  next: string
  previous: string
}

export interface IResponseResult {
  error?: IResponseError
  success?: boolean
  redirect_url?: string
  count?: number
}
export interface IResponseError {
  code: string
  message: string
  trace_keys: string[]
}
