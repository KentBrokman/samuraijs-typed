import React from 'react';
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/Validators/validators";
import {Element} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../Redux/Redux-store";

const Input = Element('input');

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'}
                       component={Input}
                       name={'email'}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       component={Input}
                       name={'password'}
                       validate={[required]}
                       type={'password'}
                />
            </div>
            <div>
                <Field type={'checkbox'} component={'input'} name={'rememberMe'}/> remember me
            </div>
            {error && <div className={style.formCommonError}>{error}</div>}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field placeholder={'writer proper captcha'}
                                  component={Input}
                                  name={'captchaUrl'}
                                  validate={[required]}/>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({isAuth, login, captchaUrl}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }

    if(isAuth) return <Redirect to={'/profile'} />

    return (

        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}
                            captchaUrl={captchaUrl}/>
        </div>
    )
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);