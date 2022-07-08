import React from 'react'
import { makeStyles, Modal, Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import ButtonActions from '../../../components/Actions'
import LoadingProgress from '../../../components/Progress'

const useStyles = makeStyles({
  modal: {
    textAlign: 'center',
    backgroundColor: 'white',
    width: '400px',
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 5,
    position: 'absolute',
    top: '50%',
    left: '54%',
    transform: 'translate(-50%, -50%)'
  }
})

export default function DeleteModal ({ open = false, onOk, onCancel, loading = false }) {
  const classes = useStyles()
  return (
    <Modal open={open}>
        <Box className={classes.modal}>
            {
                !loading &&
                <Typography variant="subtitle1" fontSize={'18px'} pb={3}>
                    Are you sure you want to delete this company and its scenarios?
                </Typography>
            }
            {
                loading &&
                <Box>
                    <Typography>We are deleting this company</Typography>
                    <LoadingProgress/>
                </Box>
            }
            <ButtonActions
                onOk={onOk}
                okName='YES'
                onCancel={onCancel}
                cancelName='NO'>
            </ButtonActions>
        </Box>
    </Modal>
  )
}
