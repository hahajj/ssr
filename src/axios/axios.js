// 导入axios
import {BASE_URL, UM_LOGIN_URL} from './config' 						// 导入配置文件

// import resetMessage from '@com/utils/resetMessage'
// import store from '../store'
import  axios from "axios";

// 创建axios实例
const service = axios.create({
    baseURL: '/', // api 的 base_url
    timeout: 20000, // 请求超时时间
    withCredentials: true //允许请求带cookie (跨域时需要)
});
// request拦截器
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Cache-Control'] = 'no-cache';
        return config
    },
    error => {
        Promise.reject(error)
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
    },
    error => {
        if (!error.response) {

            return Promise.reject(error)
        }

        //下载报错处理
        if (error.response&&error.response.status == 500 && error.response.config.url.indexOf('export') > -1) {

            return Promise.reject(error)
        }
        if (error.response.data) {
            //error.response.data.message 多数情况报错  error.response.data.data 数据指标报错   error.response.data未有明确信息
            const message= error.response.data.message || error.response.data.data || error.response.data

        }
        return Promise.reject(error)
    }
);
export default service

