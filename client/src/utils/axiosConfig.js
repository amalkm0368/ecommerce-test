import axios from "axios"

const apiAxios = axios.create({
  baseURL: "http://localhost:5001/api",
})

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiAxios

export const backend_url = "http://localhost:5000/"
 