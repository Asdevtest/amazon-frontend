import enLocale from 'date-fns/locale/en-US'
import ruLocale from 'date-fns/locale/ru'
import zhLocale from 'date-fns/locale/zh-CN'
import { useEffect, useState } from 'react'

import EventIcon from '@mui/icons-material/Event'
import TextField from '@mui/material/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { darkTheme, lightTheme } from '@constants/theme/mui-theme'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { LanguageKey } from '@typings/enums/language-key'
import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './date-picker.style'

const getLocalByLanguageTag = languageTag => {
  switch (languageTag) {
    case LanguageKey.ru:
      return ruLocale

    case LanguageKey.en:
      return enLocale

    case LanguageKey.zh:
      return zhLocale

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

export const DateMonthYearPicker = ({ value, onChange, ...restProps }) => {
  const { classes: styles } = useStyles()

  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <DatePicker
          closeOnSelect
          showToolbar={false}
          views={['year', 'month']}
          // label="Year and Month"
          inputProps={{
            className: styles.root,
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

export const NewDatePicker = ({ value, onChange, variant = 'standard', error = false, ...restProps }) => {
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
        <DatePicker
          closeOnSelect
          showToolbar={false}
          componentsProps={{
            actionBar: {
              actions: [],
            },
          }}
          inputProps={{
            title: placeholder,
            placeholder,
            className: cx(styles.root, { [styles.error]: error }),
          }}
          value={value ? value : null}
          renderInput={params => (
            <TextField {...params} title={t(TranslationKey.Date)} helperText={null} variant={variant} size="small" />
          )}
          onChange={newValue => {
            onChange(newValue)
          }}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export const DatePickerTime = ({ value, onChange, ...restProps }) => {
  const { classes: styles } = useStyles()

  const [local, setLocal] = useState(enLocale)

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <TimePicker
          inputProps={{ placeholder: '10:00', className: styles.root }}
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

export const DefaultDatePicker = props => {
  const { value, onChange, ...restProps } = props

  const { classes: styles } = useStyles()

  const [local, setLocal] = useState(enLocale)

  const [placeholder, setPlaceholder] = useState('mm/dd/yyyy')

  useEffect(() => {
    setLocal(getLocalByLanguageTag(SettingsModel.languageTag))

    setPlaceholder(getPlaceholderByLanguageTag(SettingsModel.languageTag))
  }, [SettingsModel.languageTag])

  return (
    <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={local}>
        <DatePicker
          disablePast
          closeOnSelect
          showToolbar={false}
          value={value}
          renderInput={params => <TextField {...params} helperText={null} />}
          components={{
            OpenPickerIcon: () => <EventIcon className={styles.openPickerIcon} />,
          }}
          inputProps={{
            placeholder,
          }}
          componentsProps={{
            actionBar: {
              actions: [],
            },
          }}
          onChange={onChange}
          {...restProps}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
