import DateFnsUtils from '@date-io/date-fns'
import TextField from '@mui/material/TextField'
import {ThemeProvider, createTheme} from '@mui/material/styles'
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
// import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {DatePicker as NewestDatePicker, TimePicker} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'

import {useEffect, useState} from 'react'

import {
  KeyboardDatePicker,
  KeyboardDateTimePicker, // KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import enLocale from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'

import {LanguageKey} from '@constants/translations/language-key'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './date-picker.style'

const getLocalByLanguageTag = languageTag => {
  switch (languageTag) {
    case LanguageKey.ru:
      return ruLocale

    case LanguageKey.en:
      return enLocale

    default:
      return enLocale
  }
}

const getPlaceholderByLanguageTag = languageTag => {
  switch (languageTag) {
    case LanguageKey.ru:
      return 'дд.мм.гггг'

    case LanguageKey.en:
      return 'mm/dd/yyyy'

    default:
      return 'mm/dd/yyyy'
  }
}

export const DateMonthYearPicker = ({value, onChange, ...restProps}) => {
  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
      <NewestDatePicker
        closeOnSelect
        showToolbar={false}
        views={['year', 'month']}
        // label="Year and Month"
        value={value}
        renderInput={params => <TextField {...params} helperText={null} variant="standard" size="small" />}
        onChange={newValue => {
          onChange(newValue)
        }}
        {...restProps}
      />
    </LocalizationProvider>
  )
}

export const NewDatePicker = ({value, onChange, ...restProps}) => {
  const {classes: classNames} = useClassNames()

  const [local, setLocal] = useState(enLocale)

  const [placeholder, setPlaceholder] = useState('mm/dd/yyyy')

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))

    setPlaceholder(getPlaceholderByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  const theme = createTheme({
    components: {
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            paddingRight: 10,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <NewestDatePicker
          // views={['year', 'month']}
          // label="Year and Month"
          closeOnSelect
          showToolbar={false}
          componentsProps={{
            actionBar: {
              actions: [],
            },
          }}
          inputProps={{
            placeholder,
            className: classNames.root,
          }}
          value={value}
          renderInput={params => <TextField {...params} helperText={null} variant="standard" size="small" />}
          onChange={newValue => {
            onChange(newValue)
          }}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export const DatePicker = ({value, onChange}) => {
  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={local}>
      <KeyboardDateTimePicker
        clearable
        value={value}
        placeholder="10/10/2018 10:00"
        // minDate={new Date()}
        format="dd/MM/yyyy HH:mm"
        onChange={date => onChange(date)}
      />
    </MuiPickersUtilsProvider>
  )
}
export const DatePickerDate = ({value, onChange}) => {
  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={local}>
      <KeyboardDatePicker
        clearable
        // views={['year', 'month']}
        value={value}
        style={{width: '100%'}}
        placeholder="10/10/2018"
        // minDate={new Date()}
        format="dd/MM/yyyy"
        onChange={date => onChange(date)}
      />
    </MuiPickersUtilsProvider>
  )
}
export const DatePickerTime = ({value, onChange, ...restProps}) => {
  const {classes: classNames} = useClassNames()

  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  const theme = createTheme({
    components: {
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            paddingRight: 10,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <TimePicker
          inputProps={{placeholder: '10:00', className: classNames.root}}
          value={value}
          renderInput={params => <TextField {...params} helperText={null} variant="standard" size="small" />}
          onChange={newValue => {
            onChange(newValue)
          }}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
