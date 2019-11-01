import { FetchHeaderParam, FetchHeaderParamAndResponse } from './interface'
/**
 * @param T :代表传入参数数据格式data
 * @param k: 代表返回参数的数据格式
 * credentials 默认带上cookie
 */
class Http {
    public async post<T extends object, K>(url: string, data: T, param?: FetchHeaderParam): Promise<K> {
        param = {
            credentials: 'include',
            ...param,
        }
        param.headers = param && param.headers ? param.headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        let body = '';
        if (typeof data === 'object') {
            switch (param.headers['Content-Type']) {
                case 'application/json; charset=utf-8':
                    body =  JSON.stringify(data);
                    break;
                case 'application/x-www-form-urlencoded':
                    Object.keys(data).map(item => body += `${item}=${data[item]}&`)
                    body = body.substring(0, body.length - 1)
                    break;
            }
        }
        const result: Promise<K> = (await fetch(url, { ...param, method: 'post', body })).json();
        return result
    }

    public async get<T extends object, K>(url: string, data: T, param?: FetchHeaderParam): Promise<K> {
        param = {
            credentials: 'include',
            ...param
        }
        let body = '';
        if (typeof data === 'object') {
            Object.keys(data).map(item => body += `${item}=${data[item]}&`)
        }
        const result: Promise<K> = (await fetch(`${url}${body}`, { method: 'post', ...param })).json();
        return result
    }
}

const http = new Http()

async function FecthRequest<T extends object, K>(url: string, data: T, param: FetchHeaderParamAndResponse = {}) {
    try {
        const result: K = await http[param.type || 'post'](url, data, param.FetchHeaderParam)
        return result
    } catch{
        if (param.handle && param.handle.throwHandleFunction) {
            param.handle.throwHandleFunction()
        }
        return null
    }
}



export { FecthRequest, FetchHeaderParam, FetchHeaderParamAndResponse }


