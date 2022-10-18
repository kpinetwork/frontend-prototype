import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Card, makeStyles, TextField, Button } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
import { CardActions } from '@mui/material'
import ButtonActions from '../../../../components/Actions'

const tags = ['tag1', 'tag2']

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

export function TagsTab ({ onChange, onSave, onCancel }) {
  const classes = useStyles()
  const [activeEdition, setActiveEdition] = useState(false)

  const onActive = () => {
    setActiveEdition(true)
  }
  return (
    <Card className={classes.form}>
        <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'start', flexWrap: 'wrap' }} px={2} component='form'>
            <FormControl className={classes.input}>
            <FormLabel className={classes.label}>Tags</FormLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={tags}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={(event) => onChange(event, 'tags')}
              disabled = {!activeEdition}
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
        <Button onClick={onActive}>Modify</Button>
        {
            activeEdition
              ? <CardActions>
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
              : ''
        }
    </Card>
  )
}
