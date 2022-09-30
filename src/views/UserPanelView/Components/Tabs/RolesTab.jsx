import React, { useState, useEffect } from 'react'
import { Grid, Snackbar, Button, Box, FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Settings } from '@material-ui/icons'
import ButtonActions from './../../../../components/Actions'
import LoadingProgress from './../../../../components/Progress'
import useUserRole from './../../../../hooks/useUserRole'
import { Alert } from '@aws-amplify/ui-react'

const useStyles = makeStyles(theme => ({
  option: {
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      color: '#171715',
      textTransform: 'capitalize'
    }
  },
  circle: {
    '& .MuiSvgIcon-root': {
      fontSize: 16
    },
    '&, &.MuiRadio-colorSecondary': {
      color: '#008b9a'
    }
  },
  textButton: {
    textTransform: 'none',
    marginRight: 10
  },
  row: {
    flexDirection: 'row-reverse',
    display: 'flex'
  }
}))

export function RolesTab ({ rootClass, roles, user, setUser }) {
  const classes = useStyles()
  const [wantsChange, setChange] = useState(false)
  const [activeRole, setRole] = useState('customer')
  const { changed, isUpdatingRole, changeUserRoles } = useUserRole()
  const [openError, setOpenError] = useState(false)

  const wantsChangeRole = (value) => {
    setChange(value)
  }

  const changeUserRole = async () => {
    if (user?.roles[0] !== activeRole) {
      const data = {
        new_role: activeRole,
        current_role: user?.roles[0]
      }
      const response = await changeUserRoles(data, user?.email)
      if (response) {
        setRole(activeRole)
        setUser((prevUser) => ({ ...prevUser, roles: [activeRole] }))
      } else {
        setOpenError(true)
        setRole(user?.roles[0])
      }
      setChange(false)
    }
  }

  const selectRole = (event) => {
    if (event?.target?.value) setRole(event.target.value)
  }

  useEffect(() => {
    if (user?.roles == null || user?.roles.length === 0) setRole('customer')
    else {
      const firstRole = user?.roles[0]
      setRole(firstRole)
    }

    return () => {
      setRole('customer')
    }
  }, [changed])

  return (
    <Grid className={rootClass}>
      <Snackbar open={openError} autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert variation="error">Cannot change user role</Alert>
      </Snackbar>
      {
        isUpdatingRole &&
        <LoadingProgress />
      }
      {!wantsChange &&
        <Box className={classes.row}>
          <Button onClick={(_) => wantsChangeRole(true)}
          className={classes.textButton}
          startIcon={<Settings style={{ color: '#364b8a' }}/>}
          >
            Change role
          </Button>
        </Box>
      }
      <Box>
        <FormControl
          value={activeRole}
          onChange={selectRole}
        >
          <RadioGroup>
            {
              roles.map((role) => {
                return (
                  <FormControlLabel
                    key={role?.name}
                    value={role?.name}
                    control={<Radio className={classes.circle}/>}
                    label={role?.name}
                    className={classes.option}
                    disabled={!wantsChange}
                    checked={role?.name === activeRole}
                  />
                )
              })
            }
          </RadioGroup>
        </FormControl>
      </Box>
      {wantsChange &&
        <ButtonActions
        onOk={(_) => changeUserRole()}
        onCancel={(_) => wantsChangeRole(false)}
        okName="Save"
        cancelName="Cancel"
        />
      }
    </Grid>
  )
}
