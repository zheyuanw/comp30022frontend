import axios from 'axios'

const requestmovie = axios.create({
  baseURL: "https://imdb-api.com/en/API/Top250Movies/",
  timeout: 10000
})

export default requestmovie