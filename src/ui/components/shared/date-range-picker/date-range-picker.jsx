import dayjs from 'dayjs'
import { useState } from 'react'

import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const shortcutsItems = [
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('week'), today.endOf('week')]
    },
  },
  {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs()
      const prevWeek = today.subtract(7, 'day')
      return [prevWeek.startOf('week'), prevWeek.endOf('week')]
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs()
      return [today.subtract(7, 'day'), today]
    },
  },
  {
    label: 'Current Month',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('month'), today.endOf('month')]
    },
  },
  {
    label: 'Next Month',
    getValue: () => {
      const today = dayjs()
      const startOfNextMonth = today.endOf('month').add(1, 'day')
      return [startOfNextMonth, startOfNextMonth.endOf('month')]
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
]

export const CustomDateRangePicker = () => {
  const [value, setValue] = useState([null, null])

  console.log('value', value)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        value={value}
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
        }}
        onChange={newValue => setValue(newValue)}
      />
    </LocalizationProvider>
  )
}
