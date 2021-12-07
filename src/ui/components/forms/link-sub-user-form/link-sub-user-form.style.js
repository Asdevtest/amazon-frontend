import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    color: 'white',
    backgroundColor: 'rgb(0, 123, 255)',
    textTransform: 'none',
    marginLeft: '10px',
  },
  buttonWrapper: {
    textAlign: 'right',
  },
  mainWrapper: {
    minWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}))
