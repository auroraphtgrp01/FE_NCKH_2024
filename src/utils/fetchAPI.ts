import axios from "axios"

export const fetchAPI = async (path: string, method: string, body?: any) => {
    const accessToken = JSON.parse(localStorage.getItem('user-info') as string)?.data?.access_token

    console.log('accessToken', accessToken);
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    }
    return await axios({
        method,
        url: `http://localhost:3000${path}`,
        data: body,
        headers,
    })
}