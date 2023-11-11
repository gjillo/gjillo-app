import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

interface FieldProps {
  options: string[]
  loading: boolean
  label: string
  multiple?: boolean
}

function Field({ options, loading, label, multiple }: FieldProps) {
  return (
    <Autocomplete
      multiple={multiple || false}
      options={options}
      loading={loading}
      renderInput={params => <TextField {...params} label={label} />}
      sx={{
        mb: 3,
      }}
    />
  )
}

export default Field
