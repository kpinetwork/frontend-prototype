import React from 'react'

import { DashboardLayout } from '../../layout/dashboard_layout'
import { Content } from './Content'

function DashboardUI () {
  return (
    <DashboardLayout>
      <h1>Universe Overview</h1>
      <h5>Date range for report</h5>
      <Content/>
    </DashboardLayout>
  )
}

export default DashboardUI
