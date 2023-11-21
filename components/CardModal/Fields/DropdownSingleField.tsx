import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

interface Props {
  options: string[]
  loading?: boolean
  label: string
  onChange: (value: string | null) => void
  value: string | null
}

function DropdownSingleField({ options, loading, label, onChange, value }: Props) {
  return (
    <Autocomplete
      options={options}
      loading={loading || false}
      value={value}
      filterSelectedOptions
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      renderInput={params => <TextField {...params} label={label} />}
      onChange={((_, value) => onChange(value))}
    />
  )
}

export default DropdownSingleField
