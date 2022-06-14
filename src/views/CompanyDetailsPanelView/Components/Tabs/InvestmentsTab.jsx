import React, { useState } from 'react'
import { Box, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { InvestmentForm } from './InvestmentForm'
import { Add } from '@material-ui/icons'
import useCompanyDetails from '../../../../hooks/useCompanyDetails'
import LoadingProgress from '../../../../components/Progress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    '&.MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold'
    }
  },
  roleName: {
    marginRight: 10,
    textTransform: 'capitalize'
  }
}))

export function InvestmentsTab () {
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [investment, setInvestment] = useState({})
  const [error, setError] = useState(undefined)
  const { addInvestment, investments, isLoading } = useCompanyDetails({})

  const onChange = (event, type) => {
    setInvestment({ ...investment, [type]: event?.target?.value })
  }

  const isValidInvestment = () => {
    const pattern = /[1-2][0-9]{3}-[0-1]?[0-9]/
    const validPattern = pattern.test(investment.invest)
    const validValue = investment.invest && Number(investment.invest.split('-')[0]) < new Date().getFullYear() + 4
    return validPattern && validValue
  }

  const onSave = () => {
    const isValid = isValidInvestment()
    if (isValid) {
      addInvestment(investment)
      setInvestment({})
      setOpenAdd(false)
      setError(undefined)
    } else {
      setError('Invalid investment date')
    }
  }

  const getRounds = (investments) => {
    const rounds = investments.map(invest => invest.round)
    return rounds.filter(round => /^\d+$/.test(round))
  }

  return (
    <Grid>
      <Box>
        {
          openAdd &&
            <Box>
              <InvestmentForm
                investment={investment}
                edit={false}
                error={error}
                onChange={onChange}
                onCancel={() => {
                  setOpenAdd(false)
                  setInvestment({})
                  setError(undefined)
                }}
                onSave={onSave}
                rounds={getRounds(investments)}
              />
            </Box>
        }
      </Box>
      <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
        {
          !openAdd && !isLoading &&
            <Button
              startIcon={<Add />}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenAdd(true)}
              disabled={openAdd}
            >
              Add investments
            </Button>
        }
      </Box>
      <Box>
        {
          !isLoading &&
          <Table className={classes.root}>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell className={classes.head}>Investment date</TableCell>
                <TableCell className={classes.head}>Divestment date</TableCell>
                <TableCell className={classes.head}>Round</TableCell>
                <TableCell className={classes.head}>Structure</TableCell>
                <TableCell className={classes.head}>Ownership</TableCell>
                <TableCell className={classes.head}>Investor type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { investments && investments.length > 0 &&
                investments.map((invest) => {
                  return (
                    <TableRow key={invest.id}>
                      <TableCell>{invest.investment_date}</TableCell>
                      <TableCell>{invest.divestment_date || 'NA'}</TableCell>
                      <TableCell>{invest.round || 'NA'}</TableCell>
                      <TableCell>{invest.structure || 'NA'}</TableCell>
                      <TableCell>{invest.ownership || 'NA'}</TableCell>
                      <TableCell>{invest.investor_type || 'NA'}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        }
        {isLoading &&
          <LoadingProgress />
        }
      </Box>
    </Grid>
  )
}
