import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'

interface Props {
  label: string
  onChange: React.ComponentProps<typeof Picker>['onChange']
}

function DateField({ label, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Picker label={label} onChange={onChange} />
    </LocalizationProvider>
  )
}

export default DateField
