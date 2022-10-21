import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Card, makeStyles, TextField, Button } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
import { CardActions } from '@mui/material'
import ButtonActions from '../../../../components/Actions'
import useCompanyTags from '../../../../hooks/useCompanyTags'
import { Edit } from '@material-ui/icons'

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
    marginBottom: 50,
    marginTop: 10,
    flexDirection: 'row-reverse'
  }
}))

export function TagsTab ({ onSave }) {
  const classes = useStyles()
  const [activeEdition, setActiveEdition] = useState(false)
  const { listOfTags, tagsByCompany, isLoading, handleTagsByCompany } = useCompanyTags()
  const defaultOptions = tagsByCompany.map(tag => { return tag.name })

  return (
    !isLoading &&
      <Card className={classes.form}>
        <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
        {
          !activeEdition && !isLoading &&
            <Button
              startIcon={< Edit/>}
              style={{ textTransform: 'none' }}
              onClick={(_) => setActiveEdition(true)}
              disabled
            >
              Modify
            </Button>
        }
      </Box>
        {
            activeEdition &&
               <CardActions style={{ flexDirection: 'row-reverse', display: 'flex' }}>
                <Box px={2}>
                    <ButtonActions
                        okName='Save'
                        cancelName='Cancel'
                        onOk={onSave}
                        onCancel={() => {
                          setActiveEdition(false)
                        }}
                        reverse={false}
                    />
                </Box>
                </CardActions>
        }
        <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'center', flexWrap: 'wrap' }} px={2} component='form'>
            <FormControl className={classes.input}>
            <FormLabel className={classes.label}>Tags</FormLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={listOfTags}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              value={listOfTags.filter((item) => defaultOptions.includes(item.name))}
              onChange={handleTagsByCompany}
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
    </Card>
  )
}
