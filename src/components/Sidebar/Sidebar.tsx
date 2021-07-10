import React from 'react';
import s from './Sidebar.module.css'
import Navbar from "./Navbar/Navbar";
import FriendsContainer from "./Friends/FriendsContainer";
import Sider from "antd/es/layout/Sider";

const Sidebar: React.FC<{}> = () => {
    return (
        <Sider>
            <Navbar />
            <FriendsContainer/>
        </Sider>

    );
}

export default Sidebar;