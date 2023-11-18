import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

interface Props {
  label: string
  onChange: React.ComponentProps<typeof Picker>['onChange']
  value: string | null
}

function DateField({ label, onChange, value }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Picker label={label} value={dayjs(value)} onChange={onChange} />
    </LocalizationProvider>
  )
}

export default DateField
