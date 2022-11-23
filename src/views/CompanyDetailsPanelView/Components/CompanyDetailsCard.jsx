import React from 'react'
import { Card, CardActions, CardContent, Button, Box, Snackbar, Grid, Typography, Divider } from '@material-ui/core'
import useCompanyDetails from '../../../hooks/useCompanyDetails'
import DeleteModal from './DeleteModal'
import { DeleteOutlined } from '@material-ui/icons'

export function ItemCard ({ field, value }) {
  return (
    <Grid
      style={{ marginTop: 10, marginBottom: 10 }}
      item
    >
      <Box style={{ width: '100%', display: 'flex', marginBottom: 10 }}>
        <Typography variant='body2' style={{ width: 150, marginLeft: 25 }}>
          {field}
        </Typography>
        <Typography variant='body2'>
          {value}
        </Typography>
      </Box>
      <Grid style={{ display: 'flex', width: '90%' }}>
        <Divider style ={{
          borderBottom: '1px solid lightgray',
          width: '100%',
          marginRight: 10,
          marginLeft: 10
        }}/>
      </Grid>
    </Grid>
  )
}

export function CompanyDetailsCard () {
  const {
    company,
    deleteInProgress,
    deleteCompanyInformation,
    errorMessage,
    setErrorMessage,
    openDeleted,
    setOpenDeleted
  } = useCompanyDetails()

  return (
   <Box>
      <Snackbar
        open={!(errorMessage == null)}
        autoHideDuration={1000}
        message={errorMessage}
        onClose={() => {
          setErrorMessage(null)
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <DeleteModal
        open={openDeleted}
        loading={deleteInProgress}
        onOk={deleteCompanyInformation}
        onCancel={() => { setOpenDeleted(false) }}
      />
     <Card>
      <CardActions style={{
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row-reverse'
      }}>
        <Button
          startIcon={<DeleteOutlined style={{ color: '#364b8a' }}/>}
          style={{ textTransform: 'none' }}
          onClick={() => { setOpenDeleted(true) }}
        >
          Delete
        </Button>
      </CardActions>
      <CardContent style={{ overflowX: 'auto' }}>
        <Grid
          container
          direction='row'
          rowspacing={1}
          alignItems="flex-end"
        >
          <Grid
            item
            xs={12} sm={12} md={6} lg={6} xl={6}
          >
            <ItemCard
             field='Company'
             value={company?.name}
            />
            <ItemCard
             field='Sector'
             value={company?.sector}
            />
          </Grid>
          <Grid item
            xs={12} sm={12} md={6} lg={6} xl={6}
          >
            <ItemCard
             field='Investor Profile'
             value={company?.investorProfile}
            />
            <ItemCard
             field='Vertical'
             value={company?.vertical}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
   </Box>
  )
}
