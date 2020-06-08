import axios from 'axios'

//最终方案
export function request(config){
  //1，创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })

  //3，发送真正的网络请求
  return instance(config)
}




// export function request2(config){
//   //1，创建axios实例
//   const instance = axios.create({
//     baseURL:'http://152.136.185.210:8000/api/n3',
//     timeout:5000
//   })

//   //3，发送真正的网络请求
//   return instance(config)
// }