import React from 'react'
import { makeStyles, Modal, Box, Typography } from '@material-ui/core'
import ButtonActions from '../../../components/Actions'

const useStyles = makeStyles({
  modal: {
    textAlign: 'center',
    backgroundColor: 'white',
    width: '300px',
    padding: 10,
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
                <Typography variant="body2">Are you sure you want to reset this form?</Typography>
                <ButtonActions
                    onOk={onOk}
                    okName='YES'
                    onCancel={onCancel}
                    cancelName='NO'
                    style={{ paddingTop: 10, paddingLeft: 20 }}>
                </ButtonActions>
            </Box>
        </Modal>
  )
}
