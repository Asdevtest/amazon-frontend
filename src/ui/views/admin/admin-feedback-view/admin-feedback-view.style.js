import { createStyles } from '@material-ui/core'

export const styles = createStyles(theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    marginBottom: 20,
    width: '290px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  tableWrapper: {
    height: '82vh',
    width: '100%',
  },
}))
