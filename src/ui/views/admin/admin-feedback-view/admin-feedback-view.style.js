import { createStyles } from '@material-ui/core'

export const styles = createStyles(theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    marginBottom: 10,
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
}))
