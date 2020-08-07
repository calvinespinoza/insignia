import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Statistics } from './components/Statistics';

import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div>
      <Layout className="App">
        <Header className="header">Data</Header>
        <Layout>
          <Sider>left sidebar</Sider>
          <Content>
            <Statistics />
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
