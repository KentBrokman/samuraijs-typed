import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "26c79d39-a5a4-46b7-9032-464788bfd67c"
    }
});



export enum ResultCodesType {
    Successful = 0,
    Error = 1
}
export enum CaptchaCodeType {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesType> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

