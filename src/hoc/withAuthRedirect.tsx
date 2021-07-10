import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/Redux-store";

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    function RedirecComponent(props: MapPropsType) {
        let {isAuth, ...restProps} = props

        if (!props.isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsRedirect)(RedirecComponent)
    return ConnectedAuthRedirectComponent
}

