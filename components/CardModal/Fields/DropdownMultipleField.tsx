import { Autocomplete, Chip, TextField } from '@mui/material'
import React from 'react'

type Value<T> = {
  value: string
  color?: string
} & T
interface Props<T> {
  options: Value<T>[]
  loading?: boolean
  label: string
  onChange: (value: Value<T>[]) => void 
  value: Value<T>[]
}

function DropdownMultipleField<T>({ options, loading, label, onChange, value }: Props<T>) {
  return (
    <Autocomplete
      onChange={(_, value) => onChange(value)}
      value={value}
      options={options}
      getOptionLabel={(option: Value<T>) => option.value}
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
