import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

type Value = {
  value: string
  color?: string
}
interface Props {
  options: Value[]
  loading?: boolean
  label: string
  onChange: (value: Value[]) => void 
  value: Value[]
}

function DropdownMultipleField({ options, loading, label, onChange, value }: Props) {
  return (
    <Autocomplete
      onChange={(_, value) => onChange(value)}
      value={value}
      options={options}
      getOptionLabel={(option: Value) => option.value}
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
              bgcolor: option.color ?? 'default',
            }}
            {...getTagProps({ index })}
            key={option.value}
          />
        ))
      }
    />
  )
}

export default DropdownMultipleField
