import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { RootContext } from '../services/RootContext';

import { Layout, Menu, Table, Statistic, Card, Row, Col } from 'antd';
const { Content, Sider } = Layout;

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: [],
      loading: true,
      user: {
        Statistics: []
      },
      displayName: ""
    };
    this.getStatistics = this.getStatistics.bind(this);
  }

  componentDidMount() {
    this.getStatistics('High Score');
    this.getCurrentUserInfo();
  }
  getStatistics(statisticName) {
    fetch('http://localhost:8081/leaderboard?statistic=' + statisticName,)
      .then(response =>
        response.json()
      )
      .then((data) => {
        this.setState({
          leaderboard: data.Leaderboard,
          loading: false
        })
      })
  }

  getCurrentUserInfo() {
    fetch('http://localhost:8081/current-user')
      .then(response =>
        response.json()
      )
      .then((data) => {
        this.mapUserResult(data.FunctionResult)
        this.setState({
          user: data.FunctionResult,
          //loading: false
        })
      })
  }

  mapUserResult(userData) {
    this.setState({
      displayName: userData.DisplayName
    })
  }

  render() {
    const columns = [
      {
        title: 'Position',
        dataIndex: 'Position',
        key: 'Position',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Name',
        dataIndex: 'DisplayName',
        key: 'DisplayName',
      },
      {
        title: 'Score',
        dataIndex: 'StatValue',
        key: 'StatValue',
      }
    ];

    const statistics = this.state.user.Statistics.map((stat) => {
      return (
       
          <Card style={{ width: 300 }}>
            <Statistic
              title={stat.StatisticName}
              value={stat.Value}
              //precision={2}
              valueStyle={{ color: '#007bff' }}
            //prefix={<ArrowUpOutlined />}
            //suffix="%"
            />
          </Card>
       )
    })
    return (
      <Layout>
        <Sider theme="light">
          <AuthButton />
        </Sider>
        <Content style={{padding: '2em'}}>
          <h2>Hi, {this.state.user.DisplayName}</h2>
          <h1 style={{fontSize: 50}}>Overview</h1>
          <Row gutter={16}>
            {statistics}
          </Row>

          {JSON.stringify(this.state.user)}
          <Table className="table" columns={columns} dataSource={this.state.leaderboard} loading={this.state.loading} pagination={{ pageSize: 7 }} />
        </Content>
      </Layout>
    )

  }
}

function AuthButton() {
  let history = useHistory();
  const { authenticated, setAuthenticated } = useContext(RootContext);

  return authenticated ? (
    <p>
      <button
        onClick={() => {
          setAuthenticated(false);
          //fakeAuth.signout(() => 
          history.push("/")
          //);
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}