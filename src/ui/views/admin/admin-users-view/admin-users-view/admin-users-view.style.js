import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  editBtn: {
    marginRight: '8px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '290px',
  },

  searchContainer: {
    width: 'auto',
  },
}))
