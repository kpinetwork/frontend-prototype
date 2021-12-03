import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, PieChartOutlined, TeamOutlined, DesktopOutlined, FileOutlined } from '@ant-design/icons'
import KPI from '../assets/kpi.svg'

export function Dashboard ({ setCollapsed }) {
  const { SubMenu } = Menu

  const HandleCollapsed = () => {
    console.log('collapsed')
    setCollapsed((value) => !value)
  }
  return <>
    <img src={KPI} alt="KPI" width={100} height={40} style={{ fill: '#FFF' }} />
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={HandleCollapsed } >
        Option 1
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        Option 2
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
</>
}
