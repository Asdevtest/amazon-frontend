import DateFnsUtils from '@date-io/date-fns'

import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

export const DatePicker = ({value, onChange}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      clearable
      value={value}
      placeholder="10/10/2018"
      minDate={new Date()}
      format="dd/MM/yyyy"
      onChange={date => onChange(date)}
    />
  </MuiPickersUtilsProvider>
)
