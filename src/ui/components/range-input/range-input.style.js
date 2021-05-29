import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '80px',
  },
  label: {
    color: theme.palette.text.secondary,
    marginRight: '8px',
  },
}))
