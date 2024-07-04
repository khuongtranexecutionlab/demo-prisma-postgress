import { IMenuResponse } from "@/global/types"
import Utils from "@/utils"

export const getMenu = async (
    loading?: React.Dispatch<boolean>) => {

    let api = '/craw/menu'
    if (loading) loading(true)
    let response = await Utils.call
        .get<IMenuResponse[]>(api)
        .finally(() => {
            if (loading) loading(false)
        })

    return response?.data
}
