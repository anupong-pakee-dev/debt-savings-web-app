import axios from "axios"

export const getSession = async (data: object) => {}
export const getTransaction = async () => {
    return await axios.get(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/transaction")
}
export const getCategory = async (params: string) => {
    return await axios.get(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/category?type=${params}`)
}
export const getLog = async (data: object) => {}

export const createUser = async (data: object) => {}
export const createSession = async (data: object) => {}
export const createEmailToken = async (data: object) => {}
export const createTransaction = async (data: object) => {
    return await axios.post(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/transaction", data)
}
export const createCategory = async (data: object) => {
    return await axios.post(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/category", data)
}
export const createLog = async (data: object) => {}