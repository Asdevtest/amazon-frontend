import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    color: 'white',
    backgroundColor: 'rgb(0, 123, 255)',
    textTransform: 'none',
  },
  buttonWrapper: {
    textAlign: 'right',
  },
  modalContainer: {
    minWidth: '460px',
  },
}))
