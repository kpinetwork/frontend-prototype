import React from 'react'
import { Box, Tab, Container } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { YearSelector } from './YearSelector'
import { InvestmentYearSelector } from './InvestmentYearSelector'

export const PeerGroupTabs = ({ year, onChange }) => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
    <TabContext value={value}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
        <Tab label="By Year" value="1" />
        </TabList>
    </Box>
    <TabPanel value="1">
      <Box>
        <Container>
          <Box sx={{ display: 'flex' }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={year}
              onChange={onChange}
            />
            <InvestmentYearSelector
              nameOfSelect="Investment Year"
              year={year}
              onChange={onChange}
            />
          </Box>
        </Container>
      </Box>
    </TabPanel>
    </TabContext>
    </>
  )
}
