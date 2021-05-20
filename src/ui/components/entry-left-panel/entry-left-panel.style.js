import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  leftPanel: {
    display: 'flex',
    flex: '0 0 45%',
    flexDirection: 'column',
    padding: '48px',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  header: {
    minHeight: '20%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '48px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 700,
  },
  footer: {
    minHeight: '20%',
    display: 'flex',
    alignItems: 'flex-end',
  },
}))
