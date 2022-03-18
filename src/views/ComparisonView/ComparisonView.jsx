import React, { useEffect, useState } from 'react'
import { CardKPI } from '@components/Card/CardKPI'
import { useComparisonPeers } from '../../hooks/useComparisionPeers'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import HeadBodyGrid from '../../components/BodyGrid'
import { saveAs } from 'file-saver'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  exportButton: {
    textTransform: 'none',
    margin: 10
  }
}))

const columns = [
  { field: 'name', headerName: 'Company', width: 200, align: 'left' },
  { field: 'sector', headerName: 'Sector', width: 150, align: 'left' },
  { field: 'vertical', headerName: 'Vertical', width: 150, align: 'left' },
  { field: 'revenue', headerName: 'Revenue', width: 150, align: 'center' },
  { field: 'growth', headerName: 'Growth', width: 150, align: 'center' },
  { field: 'ebitda_margin', headerName: 'Ebitda Margin', width: 150, align: 'center' },
  { field: 'revenue_vs_budget', headerName: 'Revenue vs budget', width: 200, align: 'center' },
  { field: 'ebitda_vs_budget', headerName: 'Ebitda vs budget', width: 200, align: 'center' },
  { field: 'rule_of_40', headerName: 'Rule of 40', width: 200, align: 'center' }
]

const INITIAL_DATA = [
  { id: 1, key: 'name', value: '', sign: '', position: 'right', align: 'left' },
  { id: 2, key: 'sector', value: '', sign: '', position: 'right', align: 'left' },
  { id: 3, key: 'vertical', value: '', sign: '', position: 'right', align: 'left' },
  { id: 4, key: 'revenue', value: '', sign: '$', position: 'left', align: 'center' },
  { id: 5, key: 'growth', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 6, key: 'ebitda_margin', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 7, key: 'revenue_vs_budget', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 8, key: 'ebitda_vs_budget', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 9, key: 'rule_of_40', value: '', sign: '', position: 'right', align: 'center' }
]

const ExportOption = ({ buttonClass, isLoading, downloading, saveComparisonReport }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
     {
       !isLoading &&
       <Button
         variant='text'
         onClick={saveComparisonReport}
         startIcon={<CloudDownload style={{ color: '#364b8a' }}/>}
         className={buttonClass}
       >
         {downloading ? 'Loading ...' : 'Export CSV'}
       </Button>
     }
    </Box>
  )
}

export function ComparisonView ({ params, fromUniverseOverview }) {
  const { companyComparison, peersComparison, isLoading, downloadComparisonCsv } = useComparisonPeers({ fromUniverseOverview })
  const [data, setData] = useState([])
  const [downloading, setDownloading] = useState(false)
  const classes = useStyles()

  const validPeersComparison = () => {
    if (peersComparison == null) {
      return []
    } else return peersComparison
  }

  useEffect(() => {
    if (companyComparison) {
      setData(INITIAL_DATA.map(item => ({ ...item, value: companyComparison[item.key] })))
    }
  }, [companyComparison])

  const getValue = (item) => {
    if (item.value) {
      return item.position === 'left' ? item.sign + ' ' + item.value : item.value + ' ' + item.sign
    } else return 'NA'
  }

  const getPercentageValues = (value) => {
    return value ? `${value} %` : 'NA'
  }

  const getRevenueValue = (value) => {
    if (value === 'NaN' || value == null) return 'NA'
    const isNumber = !isNaN(value)
    return isNumber ? `$ ${value}` : value
  }

  const saveComparisonReport = async () => {
    setDownloading(true)
    const data = await downloadComparisonCsv()
    setDownloading(false)
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'ComparisonPeers.csv')
  }

  return (
    <>
      <CardKPI title={'Peer Group Analysis'} actions={false} height={'80vh'} fullScreen={true}
      topActions={
        <ExportOption
          buttonClass={classes.exportButton}
          saveComparisonReport={saveComparisonReport}
          isLoading={isLoading}
          downloading={downloading}
        />
      }
      >
        {!isLoading
          ? <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow >
                    {columns.map(column => (
                      <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                    { !fromUniverseOverview &&
                      <TableRow
                        key={companyComparison?.name}
                        style={{ backgroundColor: '#cececeb9' }}>
                          {data.map((item, index) => (<TableCell key={`${index}-${item.key}-comparison-peers`} align={item.align}>{getValue(item)}</TableCell>))}
                      </TableRow>
                    }
                </TableHead>
                <TableBody>
                  {validPeersComparison().map((row) => (
                    <TableRow
                      key={row?.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.sector}</TableCell>
                      <TableCell align="left">{row.vertical}</TableCell>
                      <TableCell align="center">{getRevenueValue(row.revenue)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.growth)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_margin)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.revenue_vs_budget)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_vs_budget)}</TableCell>
                      <TableCell align="center">{row.rule_of_40 || 'NA'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          : <HeadBodyGrid/>}
      </CardKPI>
    </>
  )
}
