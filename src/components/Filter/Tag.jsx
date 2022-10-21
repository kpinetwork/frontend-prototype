import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import useTag from '../../hooks/useTag'

const useStyles = makeStyles((theme) => ({
  inputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 10
      }
    }
  }
}))

export function Tag ({ setFilters, selectedList }) {
  const classes = useStyles()
  const { tags } = useTag()
  const defaultOptions = selectedList?.split(',') ?? []

  const handleChange = (_event, tagsSelector) => {
    const selectedTags = tagsSelector.map(tag => tag.name)
    setFilters((prev) => ({ ...prev, tag: selectedTags.toString() }))
  }

  return (
        <Autocomplete
            multiple
            options={tags}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            className={classes.inputBorder}
            value={tags.filter((item) => defaultOptions.includes(item.name))}
            renderInput={(params) => (
                <TextField
                  {...params}
                  label='Tags'
                  size='small'
                  variant = 'outlined'
                  style = {{ padding: 0, flexWrap: 'wrap' }}
                />
            )}
        />

  )
}
