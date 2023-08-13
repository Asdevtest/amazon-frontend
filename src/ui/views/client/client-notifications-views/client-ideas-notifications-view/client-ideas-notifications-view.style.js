export const styles = theme => ({
  tableWrapper: {
    marginTop: '10px',
    width: '100%',
    height: '80vh',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  root: {
    boxShadow: theme.palette.boxShadow.paper,
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

  archiveHandler: {
    color: theme.palette.text.general,
    marginLeft: 'auto',
  },
})
