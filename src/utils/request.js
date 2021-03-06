// 基于 axios 请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建了axios 实例，说白了就是复制了一个axios
// 我们通过这个实例去发请求，吧需要的配置给这个实例来
 const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',    //请求的基础路径
    // 定义后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      // console.log(data)
  
      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }
  
      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 所有请求经过这里
    // console.log(config)
    const user = JSON.parse(window.localStorage.getItem('user'))

    

    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 然后我们就可以在允许请求出去之前定制统一的业务功能处理
    // 例如统一设置token

    // 当这里return config;之后请求在会才会真正的发出去
    return config
  }, function (error) {
    //   失败经过这里
    return Promise.reject(error)
  })

// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })