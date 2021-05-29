import DateFnsUtils from '@date-io/date-fns'

import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import {Input} from '@components/input'

const DatePickerInput = ({className, value, onChange, InputProps}) => (
  <Input className={className} value={value} onChange={onChange} {...InputProps} />
)

export const DatePicker = ({variant = 'inline', format = 'dd.MM.yyyy', mask = '__.__.____', value, onChange}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      variant={variant}
      value={value}
      format={format}
      mask={mask}
      TextFieldComponent={DatePickerInput}
      onChange={onChange}
    />
  </MuiPickersUtilsProvider>
)
