import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '../../../components/BodyGrid'

const INITIAL_DATA = [
  { id: 1, key: 'annual_revenue', label: 'Most revenue annual revenue', value: '', sign: '$' },
  { id: 2, key: 'annual_ebitda', label: 'Most recenut annual ebitda', value: '', sign: '$' },
  { id: 3, key: 'anual_rule_of_40', label: 'Most recent rule of 40', value: '', sign: '' },
  { id: 4, key: 'current_revenue_growth', label: 'Current budgeted revenue growth', value: '', sign: '%' },
  { id: 5, key: 'current_ebitda_margin', label: 'Current budgeted ebitda growth', value: '', sign: '%' },
  { id: 6, key: 'current_rule_of_40', label: 'Current budgeted rule of 40', value: '', sign: '' }
]

export function CompanyCard ({ financialProfile, isLoading }) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (financialProfile) {
      setData(INITIAL_DATA.map(item => ({ ...item, value: financialProfile[item.key] })))
    }
  }, [financialProfile])

  return (
        <CardKPI title={'Company financial profile'} actions={false} overflow='auto'>
            <Table>
                <TableBody>
                    {!isLoading
                      ? data.map(row => (
                        <TableRow key={row.id}>
                            <TableCell colSpan={8}>{row.label}</TableCell>
                            <TableCell align="right">{row.value + ' ' + row.sign}</TableCell>
                        </TableRow>
                      ))
                      : <HeadBodyGrid/>}
                </TableBody>
            </Table>
        </CardKPI>

  )
}
