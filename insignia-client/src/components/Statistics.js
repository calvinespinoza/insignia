import React from 'react';
import { Table } from 'antd';
import queryString from 'query-string';

export class Statistics extends React.Component {
  constructor() {
    super();
    this.state = { leaderboard: [], loading: true };
    this.getStatistics = this.getStatistics.bind(this);
  }

  componentDidMount() {
    this.getStatistics('High Score');
  }
  getStatistics(statisticName) {
    fetch('http://localhost:8080/leaderboard?statistic=' + statisticName,)
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
    return <Table className="table" columns={columns} dataSource={this.state.leaderboard} loading={this.state.loading} pagination={{ pageSize: 7 }} />;
  }
}