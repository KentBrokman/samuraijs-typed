import React, {ComponentType} from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";


function A<T extends {name: string}>(entity: T) {

}

A({name: 'kek', age: 132})

function HipHopHOC<WP extends {hiphop: number}>(WrappedComponent: React.ComponentType<WP>) {
    let ContainerComponent: React.FC<Omit<WP, 'hiphop'>> = (props) => {
        return <WrappedComponent {...props as WP} hiphop={10} />
    }
    return ContainerComponent
}

function DanceHOC<WP extends {dance: number}>(WrappedComponent: React.ComponentType<WP>) {
    let ContainerComponent: React.FC<Omit<WP, 'dance'>> = (props) => {
        return <WrappedComponent {...props as WP} dance={10} />
    }
    return ContainerComponent
}



type C1PropsType =  {
    title: string
    hiphop: number
}

type MapPropsType = {
    dance: number
}

type C1ParamsType = {
    userId: string
}

const C1: React.FC<C1PropsType & MapPropsType & RouteComponentProps<C1ParamsType>> = (props) => {
    return <div>{props.title}</div>
}

// const C1Container = HOC1(C1);
// const C2Container = HOC2(C1Container)

type FromHipHopHOCPropsType = Omit<C1PropsType, 'hiphop'>
type FromHipHopHOCType = ComponentType<FromHipHopHOCPropsType>
type FromDanceHOCType = ComponentType<Omit<FromHipHopHOCPropsType, 'dance'>>

// const SuperHOC = compose<FromHipHopHOCType, //A
//     ComponentType<C1PropsType>,  //T1
//     FromDanceHOCType>(  // R
//         DanceHOC,
//         HipHopHOC
// )

// const C1Container2 = SuperHOC((C1))

// const App = () => {
//     return <C1Container2 title="hello" />
// }

let mstp = (state: any) => ({
    dance: 12
})

const C1_1connect = connect(mstp)(C1)
const ConnectedWithRouterC1_ = withRouter(C1_1connect)

const ConnectedWithRouterC1 = compose<ComponentType<Omit<C1PropsType, 'hiphop'>>>(
    withRouter,
    connect(mstp),
    HipHopHOC
)(C1)

const App = () => {
    return <ConnectedWithRouterC1 title="hello" />
    // return <C1_1connect title="hello" />
}



// let FirstComponent = (props: PropsType) => {
//     return (
//         <h1>{props}</h1>
//     )
// }
//
// type PropsType = {
//     title: string
//     dance: number
//     hiphop: number
// }
//
// compose<React.ComponentType<Omit<PropsType, 'title'>>>(HOC1, HOC2)(FirstComponent)

// const App = () => {
//     return (
//         <FirstComponent title={'Hello'} />
//     )
// }


