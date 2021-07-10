import React, {useEffect} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import s from './Navbar.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined
} from '@ant-design/icons';


const Navbar: React.FC<{}> = () => {
    const { Header, Content, Footer, Sider } = Layout;

    const pathName = useHistory().location.pathname.match(/\/\w+/)

    return (
        <Sider>
            <Menu theme="dark"
                  defaultSelectedKeys={['/']}
                  selectedKeys={[pathName !== null ? pathName[0] : '/']}
                  mode="inline">
                <Menu.Item key="/profile" icon={<PieChartOutlined/>}>
                    <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="/dialogs" icon={<DesktopOutlined/>}>
                    <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
                </Menu.Item>
                <Menu.Item key="/chat" icon={<DesktopOutlined/>}>
                    <NavLink to="/chat" activeClassName={s.active}>Chat</NavLink>
                </Menu.Item>
                <Menu.Item key="/music" icon={<DesktopOutlined/>}>
                    <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
                </Menu.Item>
                <Menu.Item key="/settings" icon={<DesktopOutlined/>}>
                    <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
                </Menu.Item>
                <Menu.Item key="/users" icon={<DesktopOutlined/>}>
                    <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
        // <nav className={s.nav}>
        //     <div className={s.item}>
        //         <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
        //     </div>
        //     <div className={s.item}>
        //         <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
        //     </div>
        //     <div className={s.item}>
        //         <NavLink to="/news" activeClassName={s.active}>News</NavLink>
        //     </div>
        //     <div className={s.item}>
        //         <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
        //     </div>
        //     <div className={s.item}>
        //         <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
        //     </div>
        //     <div className={s.item}>
        //         <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
        //     </div>
        // </nav>
    );
}

export default Navbar;