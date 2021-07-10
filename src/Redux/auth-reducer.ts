import {CaptchaCodeType, ResultCodesType} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./Redux-store";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";




let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};



const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA':
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload,
                // kek: 12
            }
        default:
            return state;
    }

}




export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_AUTH_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'SET_CAPTCHA_URL',
        payload: {captchaUrl}
    } as const)
}



export let getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authApi.me();

    if (data.resultCode === ResultCodesType.Successful) {
        let {id, email, login} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export let login = (email: string, password: string, rememberMe: boolean, captchaUrl: string): ThunkType => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captchaUrl)

    if (data.resultCode === ResultCodesType.Successful) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === CaptchaCodeType.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        } else {
            let error = data.messages.length > 0 ? data.messages[0] : 'Common error'
            dispatch(stopSubmit('login', {_error: error}))
        }

    }
}

export let logout = (): ThunkType => async (dispatch) => {
    let data = await authApi.logout()

    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }

}

export let getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityApi.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url))
}


export default authReducer;


type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsTypes | FormAction>