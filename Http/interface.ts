export interface FetchHeaderParam {
    headers?: {
        "Content-Type": "application/x-www-form-urlencoded" | "application/json; charset=utf-8"
    },
    credentials?: "include" | "omit" | "same-origin" | undefined,
}

export interface FetchHeaderParamAndResponse {
    FetchHeaderParam?: FetchHeaderParam
    handle?: {
        throwHandleFunction: () => void
    }
    type?: 'get' | 'post'
}





