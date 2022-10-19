import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useTag from '../../hooks/useTag'

export function Tag ({ setFilters }) {
  const { tags } = useTag()

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
