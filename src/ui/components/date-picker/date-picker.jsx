import DateFnsUtils from '@date-io/date-fns'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TextField from '@mui/material/TextField'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
// import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {DatePicker as NewestDatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'

import {useEffect, useState} from 'react'

import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import enLocale from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'

import {LanguageKey} from '@constants/translations/language-key'

import {SettingsModel} from '@models/settings-model'

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
  const [local, setLocal] = useState(enLocale)

  const [placeholder, setPlaceholder] = useState('mm/dd/yyyy')

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))

    setPlaceholder(getPlaceholderByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
      <NewestDatePicker
        // views={['year', 'month']}
        // label="Year and Month"
        inputProps={{placeholder}}
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
export const DatePickerTime = ({value, onChange}) => {
  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={local}>
      <KeyboardTimePicker
        clearable
        keyboardIcon={<AccessTimeIcon />}
        style={{width: '100%'}}
        value={value}
        placeholder="10:00"
        // minDate={new Date()}
        format="HH:mm"
        onChange={time => onChange(time)}
      />
    </MuiPickersUtilsProvider>
  )
}
