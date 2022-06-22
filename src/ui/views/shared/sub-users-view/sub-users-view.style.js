import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  test: {
    padding: theme.spacing(7),
  },
  buttonBox: {
    textAlign: 'right',
    marginRight: '0',
    padding: '16px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
  },

  searchContainer: {
    width: 'auto',
  },

  actionsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}))
