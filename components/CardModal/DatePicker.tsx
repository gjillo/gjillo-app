import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'

interface DatePickerProps {
  label: string
}

function DatePicker({ label }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Picker
        label={label}
        sx={{
          width: '100%',
        }}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
