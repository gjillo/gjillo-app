import React from 'react'
import { TextField as TextFieldMUI } from '@mui/material'

interface Props {
  label: string
  onChange: React.ComponentProps<typeof TextFieldMUI>['onChange']
}

function TextField({ label, onChange }: Props) {
  return <TextFieldMUI label={label} onChange={onChange} />
}

export default TextField
