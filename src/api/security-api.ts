import {instance} from "./api";

type SecurityApiType = {
    url: string
}
export const securityApi = {
    getCaptchaUrl() {
        return instance.get<SecurityApiType>('/security/get-captcha-url')
            .then(response => response.data)
    }
}