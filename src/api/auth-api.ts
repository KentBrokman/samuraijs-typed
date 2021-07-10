import {APIResponseType, CaptchaCodeType, instance, ResultCodesType} from "./api";


type MeAuthApiType = APIResponseType<{
    id: number
    email: string
    login: string
}>

type LoginApiType = APIResponseType<{userId: number}, ResultCodesType | CaptchaCodeType>

export const authApi = {
    me() {
        return instance.get<MeAuthApiType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance.post<LoginApiType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(response => response.data)
    }
}