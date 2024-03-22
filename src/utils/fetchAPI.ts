import axios from "axios"

export const fetchAPI = async (path: string, method: string, body?: any, token?: string) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    return await axios({
        method,
        url: `http://localhost:3000${path}`,
        data: body,
        headers,
    })
}