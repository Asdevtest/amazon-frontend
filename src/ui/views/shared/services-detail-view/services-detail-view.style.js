export const styles = theme => ({
  button: {
    marginRight: '10px',
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '55vh',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },
  root: {
    border: '0 !important',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    backgroundColor: theme.palette.background.general,
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
})
