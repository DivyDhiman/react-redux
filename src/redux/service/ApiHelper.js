import axios from 'axios'

require('es6-promise').polyfill();

export class APIHelper {

    static getMethod(endpoint, headers) {
        return axios.get(endpoint, {
            headers: headers,
        }).then(function (response) {
            return response;
        }).catch(function (error) {
            if (axios.isCancel(error)) {
                return "";
            } else {
                return error.response;
            }
        }); 
    } 



    static postMethod(endpoint, payload, headers) {
        return axios.post(endpoint, payload, {
            headers: headers,
        }).then(response => {
            return response;
        }).catch(function (error) {
            if (axios.isCancel(error)) {
                return "";
            } else {
                return error.response;
            }
        })
    }
}