
import axios from 'axios'
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'




// const isPro = process.env.NODE_ENV === 'production'
// const ip_addr = document.location.hostname
// const ip_addr = '107.148.243.178'
// const ip_addr = '127.0.0.1'

const custom = axios.create({

    // baseURL: 'http://127.0.0.1:5000/api/v2',
    // baseURL: 'http://'+ip_addr+':5000/api/v2',
    baseURL: 'http://127.0.0.1:5000/v1',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}    
})

custom.interceptors.request.use((config) => {
    // nprogress.start()
    // const token = window.localStorage.getItem('access_token')
    // if (token) {
    //     config.headers['Authorization'] = 'Bearer ' + token
    // }
    return config
}, (err) => {
    // nprogress.done()
    console.log(err);
    return Promise.reject(err)
})

custom.interceptors.response.use((res) => {
    // nprogress.done()
    return res.data
}, (err) => {
    // nprogress.done()
    if (err.response && err.response.status) {
        const status = err.response.status
        if (status === 400) {

            console.log(err.response.data);
        }
        if (status === 401) {
            console.log(err.response.data);
            localStorage.removeItem('access_token')
            window.location.href='#/login'   //跳转回登录界面
            // alert('登录过期，请重新登录')
        }
        if (status === 403) {
            alert('没有权限')
        }
        if (status === 404) {
            // alert('接口路径错误')
            // alert(err.response.data)    //用户不存在
            console.log(err.response.data);
        }
        if (status === 429) {
            alert('您操作太频繁了，请稍后再试')
        }        
        if (status === 500) {
            alert('错误代码：500 \n疑似后端API接口没有正常工作')
        }
        if (status === 503) {
            alert('错误代码：503 \n程序数据库初始化失败\n请正确对接数据库')
        }
    }
    return Promise.reject(err.response.data)
})

export default custom