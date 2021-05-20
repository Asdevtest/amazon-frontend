import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  rightPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: '48px 64px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  formWrapper: {
    minWidth: '300px',
    maxWidth: '600px',
    flex: '1 1 300px',
    [theme.breakpoints.down('sm')]: {
      flex: '0 1 60%',
    },
  },
  formHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: '600',
  },
  divider: {
    margin: '8px 0px 16px',
  },
}))
