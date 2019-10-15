/**
 * Created by jerry on 2017/6/9.
 */
// import axios from 'axios'
// import Vue from 'vue'
axios.defaults.withCredentials = true;


//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    var host = window.location.host;
    if (localStorage.getItem(host + "tenantCode") != null) {
        config.headers['tenantCode'] = localStorage.getItem(host + "tenantCode");
    }
    config.headers['X-Token'] = localStorage.getItem(host + "X-Token");
    config.headers['X-User'] = localStorage.getItem(host + "X-User");

    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {
    if (response.data && response.data.errcode) {
        if (parseInt(response.data.errcode) === 40001) {
            //未登录

        }
    }
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

//测试地址
let base = 'http://118.89.64.133';
let mallUrl = "/mall/api";
let server = "/Channel-B2-Server/api";

//正式地址
// let base ='http://api2.ysy123.cn';
// let server = "/server/api";


// let base= '';
//通用方法
export const getResult = (operation, url, type, params) => {
    switch (operation) {
        case "LIST":
            return GET(url + '/list', type, params);
            break;
        case "PAGE":
            return GET(url + '/page', type, params);
            break;
        case "GETID":
            return GET(url + "/" + params, type, params);
            break;
        case "GET":
            return GET(url, type, params);
            break;
        case "POST":
            return POST(url, type, params);
            break;
        case "PATCH":
            return PATCH(url, type, params);
            break;
        case "DELETE":
            return DELETE(url, type, params);
            break;
    }
}

export const POST = (url, type, params) => {
    var allurl = getUrl(type, url);
    return axios.post(`${allurl}`, params).then(res => res.data)
}

export const GET = (url, type, params) => {
    var allurl = getUrl(type, url);
    return axios.get(`${allurl}`, { params: params }).then(res => res.data)
}

export const PUT = (url, type, params) => {
    var allurl = getUrl(type, url);
    return axios.put(`${allurl}`, params).then(res => res.data)
}

export const DELETE = (url, type, params) => {
    var allurl = getUrl(type, url);
    return axios.delete(`${allurl}`, { params: params }).then(res => res.data)
}

export const PATCH = (url, type, params) => {
    var allurl = getUrl(type, url);
    return axios.patch(`${allurl}`, params).then(res => res.data)
}

export const location = (url, type, params) => {
    var allurl = getUrl(type, url);
    window.location = allurl + params;
}


function getUrl(type, url) {
    let allurl = base;
    if (type == 1) {
        allurl = base + mallUrl;
        // allurl = "http://192.168.1.82:8080/Channel-B2-mall/api";
    } else {
        allurl = base + server;
    }
    return allurl + url;
}