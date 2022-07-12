import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TableSortLabel } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import HeadBodyGrid from '../../components/BodyGrid'
import { saveAs } from 'file-saver'
import { makeStyles } from '@material-ui/core/styles'
import { isEmptyObject } from './../../utils/userFunctions'
import CustomTooltipTitle from '../../components/CustomTooltip'
import { tooltipTitles } from '../../utils/tooltipTitles'

const useStyles = makeStyles(theme => ({
  exportButton: {
    textTransform: 'none',
    margin: 10
  },
  icon: {
    color: '#3f51b5',
    fill: '#3f51b5',
    '&:hover': {
      color: '#3f51b5',
      fill: '#3f51b5'
    }
  }
}))

const columns = [
  { field: 'name', headerName: 'Company', width: 200, align: 'left', needsTooltip: false },
  { field: 'sector', headerName: 'Sector', width: 150, align: 'left', needsTooltip: false },
  { field: 'vertical', headerName: 'Vertical', width: 150, align: 'left', needsTooltip: false },
  { field: 'revenue', headerName: 'Revenue', width: 150, align: 'center', needsTooltip: true },
  { field: 'growth', headerName: 'Growth', width: 150, align: 'center', needsTooltip: true },
  { field: 'ebitda_margin', headerName: 'Ebitda Margin', width: 150, align: 'center', needsTooltip: true },
  { field: 'revenue_vs_budget', headerName: 'Revenue vs budget', width: 200, align: 'center', needsTooltip: true },
  { field: 'ebitda_vs_budget', headerName: 'Ebitda vs budget', width: 200, align: 'center', needsTooltip: true },
  { field: 'rule_of_40', headerName: 'Rule of 40', width: 200, align: 'center', needsTooltip: true }
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

export function ComparisonView ({ companyComparison, peersComparison, isLoading, downloadComparisonCsv, fromUniverseOverview, typeOfSelector }) {
  const [data, setData] = useState([])
  const [downloading, setDownloading] = useState(false)
  const classes = useStyles()
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  const [orderDirection, setOrderDirection] = useState('asc')
  const [valueToOrderBy, setValueToOrderBy] = useState('name')

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
    if (item.value == null || item.value === 'NA') return 'NA'
    if (item.key === 'revenue') {
      return item.sign + ' ' + Math.round(item.value)
    }
    return item.value + ' ' + item.sign
  }

  const getPercentageValues = (value) => {
    if (value == null || value === 'NA') return 'NA'
    return `${value} %`
  }

  const getRevenueValue = (value) => {
    if (value == null || value === 'NA') return 'NA'
    const isNumber = !isNaN(value)
    return isNumber ? `$ ${Math.round(value)}` : value
  }

  const saveComparisonReport = async () => {
    setDownloading(true)
    const data = await downloadComparisonCsv()
    setDownloading(false)
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'ComparisonPeers.csv')
  }

  function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator (order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function createSortHandle (property) {
    return (event) => {
      const isDesc = orderBy === property && orderDirection === 'desc'
      setOrder(isDesc ? 'asc' : 'desc')
      setOrderDirection(isDesc ? 'asc' : 'desc')
      setOrderBy(property)
      setValueToOrderBy(property)
    }
  }

  return (
    <div style={{ overflow: 'none' }}>
      {typeOfSelector === 'calendar'
        ? <ExportOption
      buttonClass={classes.exportButton}
      saveComparisonReport={saveComparisonReport}
      isLoading={isLoading}
      downloading={downloading}
      />
        : <br></br>}

      <div style={{ height: '50vh', display: 'grid', alignSelf: 'center', justifySelf: 'center' }}>
        {!isLoading
          ? <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow >
                    {columns.map(column => {
                      return (
                        <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}>
                          <Box style={{ display: 'flex' }}>
                            {column.needsTooltip
                              ? <CustomTooltipTitle
                                name={column.headerName}
                                title={tooltipTitles[column.field]}
                              />
                              : column.headerName}
                            <TableSortLabel
                              name={column.headerName}
                              classes={{ icon: classes.icon }}
                              active={valueToOrderBy === column.field}
                              direction={valueToOrderBy === column.field ? orderDirection : 'asc'}
                              onClick={createSortHandle(column.field)}
                            />
                          </Box>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                    { !fromUniverseOverview && !isEmptyObject(companyComparison) &&
                      <TableRow
                        key={companyComparison?.name}
                        style={{ backgroundColor: '#cececeb9' }}>
                          {data.map((item, index) => (<TableCell key={`${index}-${item.key}-comparison-peers`} align={item.align}>{getValue(item)}</TableCell>))}
                      </TableRow>
                    }
                </TableHead>
                <TableBody>
                  {validPeersComparison().slice().sort(getComparator(order, orderBy)).map((row) => (
                    <TableRow
                      key={row?.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left" data-testid={'name'}>{row.name}</TableCell>
                      <TableCell align="left">{row.sector}</TableCell>
                      <TableCell align="left">{row.vertical}</TableCell>
                      <TableCell align="center" data-testid={'revenue'}>{getRevenueValue(row.revenue)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.growth)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_margin)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.revenue_vs_budget)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_vs_budget)}</TableCell>
                      <TableCell align="center">{row.rule_of_40 !== null ? row.rule_of_40 : 'NA'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          : <HeadBodyGrid/>}
      </div>
    </div>
  )
}
