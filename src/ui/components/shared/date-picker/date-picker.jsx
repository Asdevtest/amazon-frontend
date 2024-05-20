import enLocale from 'date-fns/locale/en-US'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CalendarIcon, DatePicker as NewDatePicker, TimePicker as NewTimePicker } from '@mui/x-date-pickers'
import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './date-picker.style'

import { getLocalByLanguageTag } from './helpers/get-local-by-language-tag'
import { getPlaceholderByLanguageTag } from './helpers/get-placeholder-by-language-tag'

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

export const DatePicker = props => {
  const { value, onChange, error = false, ...restProps } = props

  const { classes: styles, cx } = useStyles()
  const [local, setLocal] = useState(enLocale)
  const [placeholder, setPlaceholder] = useState('mm/dd/yyyy')

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))

    setPlaceholder(getPlaceholderByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <NewDatePicker
          disablePast
          closeOnSelect
          inputProps={{
            placeholder,
            className: cx(styles.root, { [styles.error]: error }),
          }}
          value={value ? value : null}
          renderInput={params => <TextField title={t(TranslationKey.Date)} size="small" {...params} />}
          onChange={onChange}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export const TimePicker = ({ value, onChange, ...restProps }) => {
  const { classes: styles } = useStyles()
  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <NewTimePicker
          inputProps={{ placeholder: '10:00', className: styles.root }}
          value={value}
          renderInput={params => <TextField {...params} />}
          onChange={onChange}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

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

export const NewDateRangePicker = () => {
  const [local, setLocal] = useState(enLocale)
  const [value, setValue] = useState([null, null])

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <DateRangePicker
          calendars={1}
          name="allowedRange"
          value={value}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            textField: { InputProps: { startAdornment: <CalendarIcon />, sx: { width: 300, height: 40 } } },
          }}
          onChange={newValue => {
            setValue(newValue)
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
