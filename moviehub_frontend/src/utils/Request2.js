import axios from 'axios'

const request2 = axios.create({
  baseURL: "https://imdb-api.com/en/API/AdvancedSearch/k_6la0a3b2/",
  timeout: 10000
})

export default request2