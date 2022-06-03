import DateFnsUtils from '@date-io/date-fns'

import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'

export const DatePicker = ({value, onChange}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
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
export const DatePickerDate = ({value, onChange}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
    <KeyboardDatePicker
      clearable
      value={value}
      placeholder="10/10/2018"
      // minDate={new Date()}
      format="dd/MM/yyyy"
      onChange={date => onChange(date)}
    />
  </MuiPickersUtilsProvider>
)
export const DatePickerTime = ({value, onChange}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
    <KeyboardTimePicker
      clearable
      value={value}
      placeholder="10:00"
      // minDate={new Date()}
      format="HH:mm"
      onChange={date => onChange(date)}
    />
  </MuiPickersUtilsProvider>
)
