import { AxiosResponse } from 'axios';
import $api from '../axios';
import { CostsResponse } from '../types/CostsResponse';
import { CreateCostResponse } from '../types/CreateCostResponse';

export default class CostsService {
    static async getAllCosts():Promise<AxiosResponse<CostsResponse>> {
        return $api.get<CostsResponse>('/costs')
    }
    static async getAllAdminCosts():Promise<AxiosResponse<CostsResponse>> {
        return $api.get<CostsResponse>('/costs/admin')
    }
    static async createCost(
        text:string | undefined = undefined, 
        price:number | undefined = undefined
      ):Promise<AxiosResponse<CreateCostResponse>> {
        return $api.post<CreateCostResponse>('/costs/create', {
          text, price
        })
    }
    static async updateCost(
        id: string,
        text:string | undefined = undefined, 
        price:number | undefined = undefined
      ):Promise<AxiosResponse<CreateCostResponse>> {
      return $api.patch<CreateCostResponse>(`/costs/update/${id}`, {
        id: id,
        text: text,
        price: price
      })
    }
    static async deleteCost(id: string):Promise<AxiosResponse<string>> {
      return $api.delete<string>(`/costs/delete/${id}`)
    }
}