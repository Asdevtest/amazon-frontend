import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    marginLeft: '10px',
  },
  noteField: {
    width: '100%',
    minHeight: '130px',
  },

  rangeField: {
    width: '250px',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },
}))
