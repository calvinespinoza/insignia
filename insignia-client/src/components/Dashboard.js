import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { RootContext } from '../services/RootContext';
import './Dashboard.css';
import levelIcon from '../assets/level-icon.png';
import logoInsignia from '../assets/insignia-light.svg';

import { Bar } from 'ant-design-pro/lib/Charts';
import { Layout, Menu, Statistic, Card, Row, Col, Empty, Progress } from 'antd';
import {
  BarChartOutlined,
  LogoutOutlined,
  BankOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: [],
      loading: true,
      user: {
        Statistics: [],
        LevelProgress: { XP: 0 }
      },
      displayName: "",
      userPoints: [],
      nextLevelXP: 0
    };
  }

  componentDidMount() {
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo() {
    fetch('/current-user')
      .then(response =>
        response.json()
      )
      .then((userData) => {
        this.mapUserResult(userData);
        this.setState({
          user: userData,
        })
      })
  }

  mapUserResult(userData) {
    var points = [];
    var nextLvl = 0;
    var nextLevelXP = 0;

    if (userData.PointsHistory) {
      for (let i = 0; i < userData.PointsHistory.length; i++) {
        points.push(
          {
            x: `Intento ${i + 1}`,
            y: userData.PointsHistory[i].Points
          }
        )
      }
    }

    if (userData.LevelProgress) {
      nextLvl = userData.LevelProgress.CurrentLevel + 1;
      nextLevelXP = 5000 * Math.pow(nextLvl, 2) - 5000 * nextLvl
    }


    this.setState({
      displayName: userData.DisplayName,
      userPoints: points,
      nextLevelXP: nextLevelXP
    })
  }

  render() {
    const statistics = this.state.user.Statistics.map((stat, i) => {
      var pos = i % 4;
      return (
        <Col xs={24} md={12} xl={6} >
          <Card className="dashboard-card statistic-card"
            style={{ width: '100%', backgroundColor: colorConfigs[pos].background }}>
            <h4 style={{ color: colorConfigs[pos].foreground }}>{stat.StatisticName}</h4>
            <Statistic
              value={stat.Value}
              //precision={2}
              valueStyle={{ color: colorConfigs[pos].foreground, fontSize: '3em' }}
              //prefix={<ArrowUpOutlined />}
              suffix={stat.Suffix}
              style={{ fontSize: 14 }}
            />
          </Card>
        </Col>
      )
    })
    return (
      <Layout>
        <Sidebar />
        <Content className="dashboard-content" style={{ padding: '2em 8em', backgroundColor: '#f9f9f9', }} >
          <Row justify="space-between" align="bottom" gutter={[24, 24]}>
            <Col xs={24} lg={16} xl={18} >
              <h2 className="main-subtitle">Hola, {this.state.user.DisplayName}!</h2>
              <h1 className="main-heading">Resumen</h1>
            </Col>
            <Col xs={24} lg={8} xl={6} style={{ fontSize: 24 }}>
              <Row align='middle' justify='end'>
                <h2 style={{ margin: 0 }}>Lvl {this.state.user.LevelProgress.CurrentLevel}</h2>
                <img src={levelIcon} alt='level-icon' style={{ width: 55, height: 55, margin: 10 }} />
              </Row>
              <Row justify='end'>
                <Progress
                  percent={this.state.user.LevelProgress.NextLevelProgress * 100}
                  strokeColor="#2FDF84"
                  trailColor="#EAEAEA"
                  showInfo={false} />
              </Row>
              <Row justify='end'>
                <span style={{ fontSize: 16 }}>
                  {this.state.user.LevelProgress.XP.toLocaleString()} XP / {this.state.nextLevelXP.toLocaleString()} XP
                </span>
              </Row>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            {statistics}
          </Row>
          <Row gutter={[24, 24]}>
            <Col xs={24} xl={18}>
              <Card className='dashboard-card' style={{ padding: '0 2em' }}>
                <div style={{ marginBottom: 30 }}>
                  <h2 className='h2-dashboard' style={{ margin: 0 }}>Historial de Puntos</h2>
                  <span style={{fontSize: 16}}>Basado en tus últimos 10 intentos</span>
                </div>
                {
                  this.state.userPoints.length > 0 ?
                    <Bar height={300} data={this.state.userPoints} color='#2FDF84' />
                    :
                    <Empty />
                }
              </Card>
            </Col>
            <Col xs={24} xl={6}>
              <Card className="dashboard-card" >
                <h2 className='h2-dashboard'>Datos de Usuario</h2>
                <Row>
                  <Col xs={8} xl={24}>
                    <Row gutter={4}>
                      <span>Nombre</span>
                    </Row>
                    <Row gutter={4}>
                      <h2>{this.state.user.DisplayName}</h2>
                    </Row>
                  </Col>
                  <Col xs={8} xl={24}>
                    <Row gutter={4}>
                      <span>Pais</span>
                    </Row>
                    <Row gutter={4}>
                      <h2>{this.state.user.Country}</h2>
                    </Row>
                  </Col>
                  <Col xs={8} xl={24}>
                    <Row gutter={4}>
                      <span>Edad</span>
                    </Row>
                    <Row gutter={4}>
                      <h2>{this.state.user.Age}</h2>
                    </Row>
                  </Col>
                  <Col xs={24} sm={12} md={8} xl={24}>
                    <Row gutter={4}>
                      <span>Escuela</span>
                    </Row>
                    <Row gutter={4}>
                      <h2>{this.state.user.School}</h2>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </ Content>
      </Layout >
    )

  }
}

const Sidebar = () => {
  let history = useHistory();
  const { setAuthenticated } = useContext(RootContext);

  return (
    <Sider theme="light" breakpoint={'sm'}>
      <img src={logoInsignia} alt="Insignia logo" style={{ height: 45, margin: 20 }}></img>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<BarChartOutlined />}>
          Resumen
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />} disabled>
          Escuela
        </Menu.Item>
        <Menu.SubMenu icon={<UserOutlined />} title="Perfil">
          <Menu.Item icon={<UserOutlined />} disabled>
            Ver Perfil
          </Menu.Item>
          <Menu.Item danger icon={<LogoutOutlined />}
            onClick={() => {
              setAuthenticated(false);
              history.push("/");
            }}>
            Salir
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>


    </Sider>
  )
}

const colorConfigs = [
  { "name": "blue", "background": "#E8F4FC", "foreground": "#2461CB" },
  { "name": "yellow", "background": "#FCF8E8", "foreground": "#CB7424" },
  { "name": "purple", "background": "#F4E8FC", "foreground": "#6D24CB" },
  { "name": "red", "background": "#FCE8E8", "foreground": "#CB2424" },
]