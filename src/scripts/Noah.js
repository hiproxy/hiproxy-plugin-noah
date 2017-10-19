import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react';
import { Button, Row, Col, Input, message } from 'antd';
import logo from './logo-light.svg';
import noahLogo from './noah-logo.png';
import 'antd/dist/antd.css';
import './Noah.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      envid: window.noah.envid,
      hosts: window.noah.hosts
    };
  }

  render() {
    return (
      <Layout id="app">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <img src={logo} />
            <img src={noahLogo} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Noah Info</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>Env List</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="main-layout">
          <Header style={{ background: '#fff', padding: '0 10px' }}>
            <h1>欢迎使用 hiproxy Noah 插件</h1>
          </Header>
          <Content style={{ margin: '10px', padding: 20, background: '#fff', flex: 1, overflow: 'auto' }}>
            <Row>
              <Col span={4} className="label">当前环境ID: </Col>
              <Col span={20}>
                <Input size="large" className="envid" placeholder="envid" value={this.state.envid} onChange={this.onChange.bind(this)} />
                <Button onClick={this.onClick.bind(this)} type="primary">切换</Button>
              </Col>
            </Row>
            <Row>
              <Col span={4} className="label">当前环境Hosts： </Col>
              <Col span={20}></Col>
            </Row>
            <Row>
              <pre className="code">{this.state.hosts.join('\n')}</pre>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }

  sendRequest (url, envid) {
    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
      var readState = xhr.readyState;
      var status = xhr.status;
      var result = xhr.responseText;

      if (readState === 4 && status >= 200 && status < 400) {
        result = JSON.parse(result);

        if (result && result.status === 0) {
          message.success(`已经切换到新的Noah环境，环境ID为【${envid}】`)
          self.setState({
            hosts: result.hosts,
            envid: envid
          });

          window.noah.hosts = result.hosts;
          window.noah.envid = envid;
        } else {
          message.error(`环境切换失败：【${result.message}】`)
        }
      }
    };

    xhr.send();
  }

  onClick() {
    var envid = this.state.envid;

    if (envid) {
      this.sendRequest('http://127.0.0.1:5525/noah/api/set-env/' + envid, envid);          
    } else {
      message.warning('请输入envid再尝试切换！');
    }
  }

  onChange (eve) {
    this.setState({
      envid: eve.target.value
    });
  }
}

export default App;
