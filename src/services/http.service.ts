import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
})

// Define the type for the httpService methods
export const httpService = {
  get<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'GET', data)
  },
  post<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'POST', data)
  },
  put<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'PUT', data)
  },
  delete<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'DELETE', data)
  },
}

// Main AJAX function with generics
function ajax<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null
): Promise<T> {
  const config: AxiosRequestConfig = {
    url: `${BASE_URL}${endpoint}`,
    method,
    data,
    params: method === 'GET' ? data : null,
  }

  return axios(config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err: AxiosError) => {
      console.log(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
        data
      )
      console.dir(err)
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        window.location.assign('/')
      }
      throw err
    })
}

// AJAX function using async/await with TypeScript
async function ajaxWithAsyncAwait<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null
): Promise<T> {
  const config: AxiosRequestConfig = {
    url: `${BASE_URL}${endpoint}`,
    method,
    data,
    params: method === 'GET' ? data : null,
  }

  try {
    const res: AxiosResponse<T> = await axios(config)
    return res.data
  } catch (err: any) {
    const axiosErr = err as AxiosError
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    )
    console.dir(axiosErr)
    if (axiosErr.response && axiosErr.response.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }
    throw axiosErr
  }
}
