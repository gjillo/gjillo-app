import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

interface Props {
  label: string
  onChange: React.ComponentProps<typeof Checkbox>['onChange']
}

function CheckboxField({ label, onChange }: Props) {
  return (
    <FormControlLabel
      control={<Checkbox onChange={onChange} />}
      label={label}
    />
  )
}

export default CheckboxField
