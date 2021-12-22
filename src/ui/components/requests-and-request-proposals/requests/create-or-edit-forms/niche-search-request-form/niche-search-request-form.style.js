import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    marginLeft: '10px',
  },
  noteField: {
    width: '100%',
    minHeight: '110px',
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

  chooseRequestTypeBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    height: '300px',
    gap: '20px',
  },

  title: {
    marginBottom: '20px',
  },
}))
