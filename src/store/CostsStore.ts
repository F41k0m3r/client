import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import AuthService from '../services/AuthService';
import CostsService from '../services/CostsService';
import { AuthResponse } from '../types/AuthResponse';
import { ICost } from '../types/Cost';
import { IUser } from '../types/User';

interface UserState {
  user: IUser 
  costs: ICost[]
  isAuth: boolean
  isLoading: boolean

  signIn: (username: string, password: string) => Promise<void>
  signUp: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>

  getCosts: () => Promise<void>
  getAllCosts: () => Promise<void>
  createCost: (name, price) => Promise<void>
  updateCost: (id, text, price) => Promise<void>
  deleteCost: (id) => Promise<void>
}

const useCostsStore = create<UserState>()(devtools((set, get) => ({
      user: {} as IUser,
      costs: [] as ICost[],
      isAuth: false,
      isLoading: true,

      signIn: async (username, password) => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          const response = await AuthService.login(username, password);
          localStorage.setItem('accessToken', response.data.accessToken);
          set((state) => ({
            ...state,
            user: response.data.user,
            isAuth: true,
          }));
        }catch (e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      }, 
      signUp: async (username, password) => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          const response = await AuthService.register(username, password);
          localStorage.setItem('accessToken', response.data.accessToken);
          set((state) => ({
            ...state,
            user: response.data.user,
            isAuth: true,
          }));
        }catch (e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      }, 
      logout: async () => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          await AuthService.logout()
          localStorage.removeItem('accessToken');
          set((state) =>({
            ...state,
            user: {} as IUser,
            costs: undefined,
            isAuth: false,
          }))
        }catch (e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      },
      checkAuth: async () => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_API_URL}/auth/refreshToken`, 
          {withCredentials: true})
          localStorage.setItem('accessToken', response.data.accessToken)
          set((state) => ({
            ...state,
            user: response.data.user,
            isAuth: true,
          }))
        }catch (e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      },
      getCosts: async () => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          const response = await CostsService.getAllCosts()
          set((state) => ({
            ...state,
            costs: response.data
          }))
        } catch(e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      },
      getAllCosts: async () => {
        set((state)=>({
          ...state,
          isLoading: true
        }))
        try {
          const response = await CostsService.getAllAdminCosts()
          set((state) => ({
            ...state,
            costs: response.data
          }))
        } catch(e: any) {
          console.error(e?.response?.data?.message)
        } finally {
          set((state)=>({
            ...state,
            isLoading: false
          }))
        }
      },
      createCost: async (name, price) => {
        try {
          const response = await CostsService.createCost(name, price)
          console.log(response)
        } catch (e: any) {
          console.error(e?.response?.data?.message)
        }
      },
      updateCost: async (id, text, price) => {
        try {
          const response = await CostsService.updateCost(id, text, price)
          console.log(response)
        } catch (e: any) {
          console.error(e?.response?.data?.message)
        }
      },
      deleteCost: async (id) => {
        try {
          const response = await CostsService.deleteCost(id)
        } catch (e: any) {
          console.error(e?.response?.data?.message)
        }
      }
    })
  )
)
export default useCostsStore;