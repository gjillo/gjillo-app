import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

interface Props {
  options: { value: string; color: string }[]
  loading?: boolean
  label: string
  onChange: React.ComponentProps<typeof Autocomplete>['onChange']
}

function MultiselectField({ options, loading, label, onChange }: Props) {
  return (
    <Autocomplete
      onChange={onChange}
      options={options}
      getOptionLabel={option => option.value}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.value === value.value}
      multiple
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.value}
        </li>
      )}
      loading={loading || false}
      renderInput={params => <TextField {...params} label={label} />}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.value}
            sx={{
              bgcolor: option.color,
            }}
            {...getTagProps({ index })}
            key={option.value}
          />
        ))
      }
    />
  )
}

export default MultiselectField
