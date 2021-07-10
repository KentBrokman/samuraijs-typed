import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import {UsersPage} from "./components/Users/UsersHOOK/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initialiseApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/Redux-store";
import {Layout} from "antd";
import Navbar from "./components/Sidebar/Navbar/Navbar";
import ChatPage2 from "./pages/Chat/ChatPage2";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initialiseApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhenledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured!')
    }

    componentDidMount() {
        this.props.initialiseApp()
        // window.addEventListener("unhandledrejection", this.catchAllUnhenledErrors);
    }

    // componentWillUnmount() {
    //     window.removeEventListener("unhandledrejection", this.catchAllUnhenledErrors);
    // }


    render() {

        if (!this.props.isInitialised) {
            return <Preloader/>
        }
        const {Header, Footer, Sider, Content} = Layout;

        return (
            <Layout className="app-wrapper">
                <Header>
                    <HeaderContainer/>
                </Header>
                <Layout>
                    <Navbar/>
                    <Content>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => {
                                return <React.Suspense fallback={<div>Loading...</div>}>
                                    <DialogsContainer/>
                                </React.Suspense>
                            }}/>
                            <Route path='/chat' render={() => {
                                return <React.Suspense fallback={<div>Loading...</div>}>
                                    <ChatPage2/>
                                </React.Suspense>
                            }}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/users' render={() => <UsersPage title={'Samurais'}/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/chat' render={() => <Login/>}/>
                            <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Footer</Footer>
            </Layout>

            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Sidebar/>
            //     <div className="app-wrapper-content">
            //         <Switch>
            //             <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            //             <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
            //             <Route path='/dialogs' render={() => {
            //                 return <React.Suspense fallback={<div>Loading...</div>}>
            //                     <DialogsContainer/>
            //                 </React.Suspense>
            //             }}/>
            //             <Route path='/music' render={() => <Music/>}/>
            //             <Route path='/news' render={() => <News/>}/>
            //             <Route path='/settings' render={() => <Settings/>}/>
            //             <Route path='/users' render={() => <UsersPage title={'Samurais'}/>}/>
            //             <Route path='/login' render={() => <Login/>}/>
            //             <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            //         </Switch>
            //
            //     </div>
            // </div>


        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isInitialised: state.app.isInitialised
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initialiseApp})
)(App);

const SamuraiJSApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp;
