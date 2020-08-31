import React from 'react';
import { Link } from "react-router-dom";
import logoInsignia from '../assets/insignia-light.svg';

import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export const Landing = () => {
    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: '#fff', color: 'black' }} >
                <img src={logoInsignia} style={{ height: '85%' }}></img>
            </Header>
            <Content style={{ margin: 'auto' }}>
                <div>Landing</div>
                <Button type='primary'>
                    <Link to="/overview">Go to Dashboard</Link>
                </Button>
            </Content>
        </Layout>
    )
}