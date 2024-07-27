import { fetchAPI } from '@/utils/fetchAPI'
import { ILoadDataFunction, ILoadDataFunctionResponse, IUserData } from '../(utils)/interface'

export const loadData = async (dataFunction: ILoadDataFunction): Promise<ILoadDataFunctionResponse> => {
  return await fetchAPI(`/users?page=${dataFunction.currentPage}&limit=${dataFunction.limit}`, 'GET').then((res) => {
    if (res.status === 200 || res.status === 201) {
      return res.data
    } else return null
  })
}
