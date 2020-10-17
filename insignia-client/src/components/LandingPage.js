import React from 'react';
import { Link } from "react-router-dom";
import './Landing.css';
import logoInsignia from '../assets/insignia-light.svg';
import waves from '../assets/waves.svg';
import vrMan from '../assets/vr-man.png';

import { Layout, Button, Image, Row, Col } from 'antd';
const { Header, Content } = Layout;

export const Landing = () => {
    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: '#fff', color: 'black' }} >
                <img src={logoInsignia} alt='Insignia logo' style={{ height: '85%' }}></img>
            </Header>
           <Image src={waves} style={{ position: "absolute", top: 0, right: 0, zIndex: 0 }} />
            <Content style={{ margin: 'auto', backgroundColor: 'white' }}>
                <Row id="landing-span" align='bottom'>
                    <Col lg={12} md={16} sm={20} xs={24} style={{ padding: '7vmax' }}>
                        <h1 className="main-title low-tracking">Descubre tu potencial con Insignia</h1>
                        <Row gutter={12}>
                            <Col md={12} xs={24} gutter={16}>
                                <Button type='primary' size='large'>
                                    <Link to="/overview">Ir al Dashboard</Link>
                                </Button>
                            </Col>
                            <Col md={12} xs={24} gutter={16}>
                                <Button size='large' type='ghost'>
                                    <Link to="/login">Iniciar Sesión</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} xs={0}>
                        <Image className="floating" src={vrMan} alt="Man using VR equipment" preview={false}/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}