import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

interface Props {
  options: string[]
  loading?: boolean
  label: string
  onChange: React.ComponentProps<typeof Autocomplete>['onChange']
}

function SingleSelectField({ options, loading, label, onChange }: Props) {
  return (
    <Autocomplete
      options={options}
      loading={loading || false}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      renderInput={params => <TextField {...params} label={label} />}
      onChange={onChange}
    />
  )
}

export default SingleSelectField
