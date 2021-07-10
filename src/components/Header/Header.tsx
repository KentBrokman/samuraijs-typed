import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import { Button } from 'antd';

type PropsType = {
    isAuth: boolean
    login: null | string
    logout: () => void
}

const Header: React.FC<PropsType> = ({isAuth, login, logout}) => {
    return (
        <header className={s.header}>
            <div>
                <img src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_1280.png" />
            </div>
            <div>
                {isAuth
                    ? <div><span style={{color: 'white'}}>{login}</span> <Button onClick={logout}>Logout</Button></div>
                    : <NavLink to="/login">Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;