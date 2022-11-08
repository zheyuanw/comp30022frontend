import axios from 'axios'
import router from "@/router"
const request = axios.create({
  baseURL: "https://moivehub-itproject-team004.herokuapp.com",
  timeout: 100000
})

const whiteUrls = ["/user/login", "/user/register", "/user/forgotPassword", "/user/forgotPassword/email",
  "/user/register/email"]
//const whiteUrls = ["/post", "/photo", "/post/:id*"]
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8'

  let userJson = localStorage.getItem("user")
  let r = JSON.parse(localStorage.getItem("refreshuser"))


  if (!whiteUrls.includes(config.url)) {
    if (!userJson) {
      router.push("/moviehub/loginpage")
    } else {
      // axios.post("https://moivehub-itproject-team004.herokuapp.com/user/verify", JSON.parse(userJson), {
      //   headers: {
      //     'Authorization': 'Bearer ' + JSON.parse(userJson)
      //   }
      // }).then(res => {
      //   if (res.status === 200) {
      //     config.headers['Authorization'] = 'Bearer ' + JSON.parse(userJson)

      //   } else {
      //     this.$message({
      //       message: "incorrect password or email!",
      //       type: "error",
      //     })
      //     // console.log("pass here!")
      //     // axios.post("https://moivehub-itproject-team004.herokuapp.com/user/refresh", r, {
      //     //   headers: {
      //     //     'Authorization': 'Bearer ' + r
      //     //   }
      //     // }).then(res => {
      //     //   if (res.status === 200) {
      //     //     localStorage.setItem('user', res.data.body)
      //     //     config.headers['Authorization'] = 'Bearer ' + JSON.parse(res.data.body)
      //     //     console.log("success")
      //     //   } else {
      //     //     this.$message({
      //     //       message: "session expired!please relogin",
      //     //       type: "error",
      //     //     })
      //     //     window.localStorage.clear()
      //     //     this.$router.push('/moviehub/loginpage')
      //     //   }
      //     // })
      //   }
      // })

      config.headers['Authorization'] = 'Bearer ' + JSON.parse(userJson)
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(
  response => {
    //let res = response.data
    // // file
    // if (response.config.responseType === 'blob') {
    //   return res
    // }
    // 兼容服务端返回的字符串数据
    // if (typeof res === 'string') {
    //   res = res ? JSON.parse(res) : res
    // }
    // 验证token
    if (response.status === 401 || response.status === 403) {

      alert("token expired,please relogin!")
      router.push("/moviehub/loginpage")
    }
    return response
  },
  async function (error) {
    const originalRequest = error.config
    console.log('err' + error) // for debug
    if (error.response.status === 401 || error.response.status === 403) {

      alert("token expired,please relogin!")
      router.push("/moviehub/loginpage")
    }
    return Promise.reject(error)
  }
)

export default request