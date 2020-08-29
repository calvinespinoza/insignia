import React from 'react';
import { Link } from "react-router-dom";

import { Layout, Menu, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export const Landing = () => {
    return (
        <Content style={{ margin: 'auto' }}>
            <div>Landing</div>
            <Button type='primary'>
                <Link to="/overview">Go to Dashboard</Link>
            </Button>
        </Content>
    )
}