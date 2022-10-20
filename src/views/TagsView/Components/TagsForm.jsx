import React from 'react'
import { Box, FormControl, FormLabel, makeStyles, TextField, Card, CardHeader, Typography } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
import { CardActions } from '@mui/material'
import ButtonActions from '../../../components/Actions'

const useStyles = makeStyles((theme) => ({
  input: {
    marginRight: 20,
    marginTop: 25,
    minWidth: 200
  },
  inputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 25
      }
    },
    '& .MuiSelect-root': {
      '&:focus': {
        borderRadius: 25
      }
    },
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 12,
    '&:invalid': {
      border: 'red solid 1px',
      borderRadius: 25,
      borderStyle: 'solid'
    }
  },
  label: {
    marginLeft: 10,
    fontSize: 14
  },
  form: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#fefeff',
    marginBottom: 50
  }
}))

export function TagsForm ({ onCancel, companies, handleTagChange, handleCompaniesChange, tag, companiesSelected, onSave }) {
  const classes = useStyles()

  return (
        <Card className={classes.form}>
        <CardHeader
          title={<Typography style={{ color: '#364b8a', fontSize: 16, fontWeight: 'bold' }}>Add Tag</Typography>}
        />
        <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'start', flexWrap: 'wrap' }} px={2} component='form'>
            <FormControl required className={classes.input}>
                <FormLabel className={classes.label}>Tag Name</FormLabel>
                <TextField
                  onChange={handleTagChange}
                  variant="outlined"
                  value={tag || ''}
                  className={classes.inputBorder}
                  placeholder={'Tag name'}
                ></TextField>
            </FormControl>
            <FormControl className={classes.input}>
            <FormLabel className={classes.label}>Companies </FormLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={companies}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              value = {companiesSelected}
              onChange={handleCompaniesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant = 'outlined'
                  className={classes.inputBorder}
                />
              )}
            />
            </FormControl>
        </Box>
        <CardActions>
        <Box px={2}>
            <ButtonActions
                okName='Save'
                cancelName='Cancel'
                onOk={onSave}
                onCancel={onCancel}
                reverse={false}
            />
        </Box>
        </CardActions>
    </Card>
  )
}
