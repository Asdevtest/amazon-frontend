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
    width: '290px',
    height: '40px',
  },

  searchContainer: {
    marginTop: 0,
    width: 'auto',
    marginRight: 'calc(50% - 345px)',
  },

  actionsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  subUserHeader: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'flex-start',
  },

  addUserButton: {
    width: '200px',
    height: '40px',
    display: 'flex',
  },
}))
