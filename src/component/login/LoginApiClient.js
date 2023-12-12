/* eslint-disable no-console */
/* eslint-disable no-undef */
import axios from "axios";

export function login(params) {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8080/auth/login',
        data: {
            username: params.username,
            password: params.password
        },
        transformRequest: [
            function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                ret = ret.substring(0, ret.lastIndexOf('&'))
                return ret
            }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(checkStatus)
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
    }
}
