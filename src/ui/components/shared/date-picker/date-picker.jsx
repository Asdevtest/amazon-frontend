import enLocale from 'date-fns/locale/en-US'
import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { DatePicker as NewDatePicker, TimePicker as NewTimePicker } from '@mui/x-date-pickers'
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
          value={value ? new Date(value) : null}
          renderInput={params => (
            <TextField
              title={t(TranslationKey.Date)}
              size="small"
              className={cx({ [styles.error]: error })}
              {...params}
            />
          )}
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
