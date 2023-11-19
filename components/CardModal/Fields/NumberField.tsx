import { TextField } from '@mui/material'
import React from 'react'

interface Props {
  label: string
  onChange: React.ComponentProps<typeof TextField>['onChange']
}

function NumberField({ label, onChange }: Props) {
  return <TextField onChange={onChange} type="number" label={label} />
}

export default NumberField
