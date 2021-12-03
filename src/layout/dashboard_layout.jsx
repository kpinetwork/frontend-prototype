import React, { useState } from 'react'
import { Layout } from 'antd'
import { Dashboard } from '../components/Dashboard'
import { HeaderKPI } from '../components/Header'

export function DashboardLayout ({ children }) {
  const { Header, Footer, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed} width={200} className="site-layout-background"><Dashboard setCollapsed ={setCollapsed}/></Sider>
      <Layout>
        <Header style={{ background: 'white' }}><HeaderKPI/></Header>
        <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: 'white',
          borderRadius: '10px'
        }}>
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    </>
  )
}
