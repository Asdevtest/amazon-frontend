import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  test: {
    padding: theme.spacing(7),
  },
  buttonBox: {
    textAlign: 'left',
    marginRight: '0',
    padding: '16px',
  },

  dataGridWrapper: {
    height: '73vh',
    overflow: 'auto',
  },
}))
