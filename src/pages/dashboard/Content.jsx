import React from 'react'
import { Table, Card, Col, Row } from 'antd'
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32
  },
  {
    key: '2',
    name: 'John',
    age: 42
  }
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  }
]
export function Content () {
  return (
        <Row gutter={ { xs: 8, sm: 16, md: 24, lg: 24 }} >
        <Col span={8}>
          <Card title="Section 1">
            <Table pagination={false} dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
        <Col span={{ xl: 8, sm: 8, md: 8, lg: 8 }}>
          <Card title="Section 2">
            <Table pagination={false} dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
        <Col span={{ xl: 8, sm: 8, md: 8, lg: 8 }}>
          <Card title="Section 3">
            <Table pagination={false} dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
      </Row>

  )
}
