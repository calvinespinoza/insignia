import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { RootContext } from '../services/RootContext';
import symbol from '../assets/insignia-symbol.svg'

import { Form, Layout, Input, Button, Checkbox, message, Card } from 'antd';

const { Content } = Layout;


export const LoginPage = () => {
    return (
        <Layout style={{ backgroundColor: '#f9f9f9' }}>
            <Content style={{ margin: 'auto', padding: '2em', backgroundColor: '#f9f9f9' }}>
                <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <img src={symbol} alt="Insignia logo" style={{height: '6vmax'}}></img>
                    <h1 style={{ fontSize: '3vmax', textAlign: "center", letterSpacing: '-0.05em' }}>Log in to Insignia</h1>
                    <Login />
                </span>
            </Content>
        </Layout>
    );
};

/*
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
*/
const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const { setAuthenticated } = useContext(RootContext);

    const onFinish = (values) => {
        var data = {
            username: values.username,
            password: values.password
        };

        fetch('http://localhost:8081/login',
            {
                "method": 'POST',
                "body": JSON.stringify(data)
            })
            .then(handleErrors)
            .then(data => {
                console.log('Request success: ', data);
                setAuthenticated(true);
                history.replace(from);
            })
            .catch(err => {
                message.error('Login failed: ' + err);
                console.log('Request failure: ', err);
            });

        console.log('Success:', values);
    };

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (<Card className='dashboard-card' style={{ padding: '2em 1em', }} >

        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size='large'
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                    Log In
                </Button>
            </Form.Item>
        </Form>
    </Card>)
}