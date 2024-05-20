import enLocale from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CalendarIcon } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { SettingsModel } from '@models/settings-model'

import { UiTheme } from '@typings/enums/ui-theme'

import { getLocalByLanguageTag } from '../date-picker/helpers/get-local-by-language-tag'

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

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const CustomDateRangePicker = () => {
  const [value, setValue] = useState([null, null])

  useEffect(() => {
    if (!value[1]) {
      setValue(prev => [prev[0], prev[0]])
    }
  }, [value])

  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale}>
        <DateRangePicker
          name="allowedRange"
          calendars={1}
          value={value}
          slots={{
            field: SingleInputDateRangeField,
            openPickerIcon: CalendarIcon,
          }}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            inputAdornment: {
              position: 'start',
            },
            openPickerButton: {
              color: 'primary',
            },
            field: { sx: { width: 250, height: 40 } },
          }}
          onChange={newValue => setValue(newValue)}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
