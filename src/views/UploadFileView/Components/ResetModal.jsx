import React from 'react'
import { makeStyles, Modal, Box } from '@material-ui/core'
import { Typography } from '@mui/material'
import ButtonActions from '../../../components/Actions'

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

export default function ResetModal ({ open, onOk, onCancel }) {
  const classes = useStyles()
  return (
        <Modal open={open}>
            <Box className={classes.modal}>
                <Typography variant="subtitle1" fontSize={'18px'} pb={3}>Are you sure you want to reset this form?</Typography>
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
