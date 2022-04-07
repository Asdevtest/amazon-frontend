import DateFnsUtils from '@date-io/date-fns'

import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
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
