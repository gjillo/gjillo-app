import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'

interface Props {
  label: string
  onChange: (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void
  value: string | null
}

function DateField({ label, onChange, value }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Picker label={label} value={value ? dayjs(value) : null} onChange={onChange} />
    </LocalizationProvider>
  )
}

export default DateField
