import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TableSortLabel, TableFooter } from '@material-ui/core'
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
  },
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    zIndex: 900,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 800,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyCompany: {
    position: 'sticky',
    left: 0,
    background: '#dbdbdb',
    top: '105px',
    zIndex: 900
  },
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
  },
  stickyFirstRow: {
    zIndex: 800,
    position: 'sticky',
    top: '105px',
    background: '#dbdbdb'
  },
  stickyAverageLabel: {
    position: 'sticky',
    left: 0,
    background: '#2f5487',
    zIndex: 900,
    color: 'white',
    fontWeight: 'bold'
  },
  stickyFooter: {
    zIndex: 1000,
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#2f5487',
    '& td': {
      zIndex: 800,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14
    }
  }
}))

const columns = [
  { field: 'name', headerName: 'Company', width: 260, align: 'left', needsTooltip: false },
  { field: 'revenue', headerName: 'Revenue', width: 110, align: 'center', needsTooltip: true },
  { field: 'growth', headerName: 'Growth', width: 110, align: 'center', needsTooltip: true },
  { field: 'ebitda_margin', headerName: 'Ebitda Margin', width: 130, align: 'center', needsTooltip: true },
  { field: 'revenue_vs_budget', headerName: 'Revenue vs budget', width: 150, align: 'center', needsTooltip: true },
  { field: 'ebitda_vs_budget', headerName: 'Ebitda vs budget', width: 150, align: 'center', needsTooltip: true },
  { field: 'rule_of_40', headerName: 'Rule of 40', width: 110, align: 'center', needsTooltip: true },
  { field: 'gross_profit', headerName: 'Gross profit', width: 120, align: 'center', needsTooltip: false },
  { field: 'gross_margin', headerName: 'Gross margin', width: 120, align: 'center', needsTooltip: false },
  { field: 'sales_and_marketing', headerName: 'Sales & marketing as percentage of revenue', width: 180, align: 'center', needsTooltip: false },
  { field: 'research_and_development', headerName: 'Research & development as percentage of revenue', width: 180, align: 'center', needsTooltip: false },
  { field: 'general_and_admin', headerName: 'General & administration as percentage of revenue', width: 180, align: 'center', needsTooltip: false },
  { field: 'clv_cac_ratio', headerName: 'CLV/CAC ratio', width: 120, align: 'center', needsTooltip: true },
  { field: 'cac_ratio', headerName: 'CAC ratio', width: 120, align: 'center', needsTooltip: true },
  { field: 'opex_of_revenue', headerName: 'Opex as percentage of revenue', width: 180, align: 'center', needsTooltip: false },
  { field: 'revenue_per_employee', headerName: 'Revenue per employee', width: 180, align: 'center', needsTooltip: true },
  { field: 'gross_retention', headerName: 'Gross retention', width: 120, align: 'center', needsTooltip: true },
  { field: 'net_retention', headerName: 'Net retention', width: 120, align: 'center', needsTooltip: true },
  { field: 'new_bookings_growth', headerName: 'New bookings growth', width: 120, align: 'center', needsTooltip: true },
  { field: 'debt_ebitda', headerName: 'Debt/Ebitda', width: 120, align: 'center', needsTooltip: false }
]

const INITIAL_DATA = [
  { id: 1, key: 'name', value: '', sign: '', position: 'right', align: 'left' },
  { id: 4, key: 'revenue', value: '', sign: '$', position: 'left', align: 'center' },
  { id: 5, key: 'growth', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 6, key: 'ebitda_margin', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 7, key: 'revenue_vs_budget', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 8, key: 'ebitda_vs_budget', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 9, key: 'rule_of_40', value: '', sign: '', position: 'right', align: 'center' },
  { id: 10, key: 'gross_profit', value: '', sign: '$', position: 'left', align: 'center' },
  { id: 11, key: 'gross_margin', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 12, key: 'sales_and_marketing', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 12, key: 'research_and_development', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 12, key: 'general_and_admin', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 13, key: 'clv_cac_ratio', value: '', sign: '', position: 'right', align: 'center' },
  { id: 14, key: 'cac_ratio', value: '', sign: '', position: 'right', align: 'center' },
  { id: 16, key: 'opex_of_revenue', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 17, key: 'revenue_per_employee', value: '', sign: '$', position: 'left', align: 'center' },
  { id: 18, key: 'gross_retention', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 19, key: 'net_retention', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 20, key: 'new_bookings_growth', value: '', sign: '%', position: 'right', align: 'center' },
  { id: 20, key: 'debt_ebitda', value: '', sign: '%', position: 'right', align: 'center' }
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

export function ComparisonView ({ companyComparison, peersComparison, averages, isLoading, downloadComparisonCsv, fromUniverseOverview, typeOfSelector }) {
  const [data, setData] = useState([])
  const [downloading, setDownloading] = useState(false)
  const classes = useStyles()
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  const [orderDirection, setOrderDirection] = useState('asc')
  const [valueToOrderBy, setValueToOrderBy] = useState('name')

  const checkValidData = (data) => {
    if (data == null) {
      return []
    } else return data
  }

  const validAverages = checkValidData(averages)

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
    return (_event) => {
      const isDesc = orderBy === property && orderDirection === 'desc'
      setOrder(isDesc ? 'asc' : 'desc')
      setOrderDirection(isDesc ? 'asc' : 'desc')
      setOrderBy(property)
      setValueToOrderBy(property)
    }
  }

  const containerStyle = { height: peersComparison?.length > 0 ? '80vh' : '20vh', display: 'grid', alignSelf: 'center', justifySelf: 'center' }

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

      <div style={containerStyle}>
        {!isLoading
          ? <TableContainer component={Paper} >
              <Table stickyHeader>
                <TableHead>
                  <TableRow >
                    {columns.map(column => {
                      return (
                        <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}
                          className={column?.field === 'name' ? classes.stickyHeaderName : classes.stickyHeader}
                        >
                          <Box style={{
                            display: 'flex',
                            minWidth: column.width
                          }}>
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
                          {data.map((item, index) => (
                            <TableCell key={`${index}-${item.key}-comparison-peers`} align={item.align}
                              className={item?.key === 'name' ? classes.stickyCompany : classes.stickyFirstRow}
                            >
                              {getValue(item)}
                            </TableCell>
                          ))}
                      </TableRow>
                    }
                </TableHead>
                <TableBody>
                  {checkValidData(peersComparison).slice().sort(getComparator(order, orderBy)).map((row) => (
                    <TableRow
                      key={row?.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left" data-testid={'name'} className={classes.sticky}>{row.name}</TableCell>
                      <TableCell align="center" data-testid={'revenue'}>{getRevenueValue(row.revenue)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.growth)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_margin)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.revenue_vs_budget)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.ebitda_vs_budget)}</TableCell>
                      <TableCell align="center">{row.rule_of_40 !== null ? row.rule_of_40 : 'NA'}</TableCell>
                      <TableCell align="center">{getRevenueValue(row.gross_profit)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.gross_margin)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.sales_and_marketing)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.research_and_development)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.general_and_admin)}</TableCell>
                      <TableCell align="center">{row.clv_cac_ratio !== null ? row.clv_cac_ratio : 'NA'}</TableCell>
                      <TableCell align="center">{row.cac_ratio !== null ? row.cac_ratio : 'NA'}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.opex_of_revenue)}</TableCell>
                      <TableCell align="center">{getRevenueValue(row.revenue_per_employee)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.gross_retention)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.net_retention)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.new_bookings_growth)}</TableCell>
                      <TableCell align="center">{getPercentageValues(row.debt_ebitda)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className={classes.stickyFooter}>
                    <TableRow>
                      <TableCell className={classes.stickyAverageLabel}>
                        Averages
                      </TableCell>
                      <TableCell >{getRevenueValue(validAverages.revenue)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.growth)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.ebitda_margin)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.revenue_vs_budget)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.ebitda_vs_budget)}</TableCell>
                      <TableCell >{validAverages.rule_of_40}</TableCell>
                      <TableCell >{getRevenueValue(validAverages.gross_profit)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.gross_margin)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.sales_and_marketing)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.research_and_development)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.general_and_admin)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.opex_of_revenue)}</TableCell>
                      <TableCell >{getRevenueValue(validAverages.revenue_per_employee)}</TableCell>
                      <TableCell >{validAverages.cac_ratio }</TableCell>
                      <TableCell >{validAverages.clv_cac_ratio}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.gross_retention)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.net_retention)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.new_bookings_growth)}</TableCell>
                      <TableCell >{getPercentageValues(validAverages.debt_ebitda)}</TableCell>
                    </TableRow>
                  </TableFooter>
              </Table>
            </TableContainer>
          : <HeadBodyGrid/>}
      </div>
    </div>
  )
}
