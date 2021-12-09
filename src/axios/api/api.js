import request from '../axios'
// import qs from "qs";

const url='data-standards/'


// export function initData(url, params) {
//     return request({
//         url: url + '?' + qs.stringify(params, { indices: false }),
//         method: 'get'
//     })
// }
export function getUserInfo() {
    return request({
        url:url+ 'user',
        method: 'get',
    })
}

//设置角色 role_code 角色编码 um_account UM账户
export function role(data) {
    return request({
        url: url+'role',
        method: 'post',
        data
    })
}

//删除角色 role_code 角色编码 um_account UM账户
export function deleteRole(data) {
    return request({
        url: url+'role/'+data,
        method: 'delete',
    })
}

export function login(username, password) {
    return request({
        url: url+'api/authenticate',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function loginout() {
    return request({
        url: url+'caslogout',
        method: 'get',
    })
}

