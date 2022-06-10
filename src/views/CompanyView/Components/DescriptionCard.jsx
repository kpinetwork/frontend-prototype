import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '../../../components/BodyGrid'

const INITIAL_DATA = [
  { id: 1, key: 'name', label: 'Name', value: '' },
  { id: 2, key: 'id', label: 'Unique ID', value: '' },
  { id: 3, key: 'sector', label: 'Sector', value: '' },
  { id: 4, key: 'vertical', label: 'Vertical', value: '' },
  { id: 5, key: 'inves_profile_name', label: 'Investor Profile', value: '' },
  { id: 6, key: 'size_cohort', label: 'Current Size Cohort', value: '' },
  { id: 7, key: 'margin_group', label: 'Growth Cohort', value: '' }
]

export function DescriptionCard ({ description, isLoading }) {
  const [data, setData] = useState([])
  useEffect(() => {
    if (description) {
      setData(() => (INITIAL_DATA.map(item => ({ ...item, value: description[item.key] }))))
    }
  }, [description])
  return (
        <CardKPI title={'Description'} actions={false} overflow='auto'>
          {!isLoading
            ? <Table>
                <TableBody>
                  {data.map(row => (
                    <TableRow key={row.id}>
                        <TableCell colSpan={8}>{row.label}</TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            : <HeadBodyGrid/>
          }
        </CardKPI>

  )
}
