import axios from 'axios'

export const fetchAPI = async (path: string, method: string, body?: any) => {
  const accessToken = JSON.parse(localStorage.getItem('user-info') as string)
    ?.data?.access_token

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
  return await axios({
    method,
    url: `http://localhost:4000${path}`,
    data: body,
    headers,
  })
}
