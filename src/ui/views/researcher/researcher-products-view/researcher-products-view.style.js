export const styles = theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '20px',

    backgroundColor: theme.palette.background.general,
  },
  formWrapper: {
    marginTop: '10px',
  },
  tableWrapper: {
    marginTop: '10px',
    width: '100%',
    height: '46vh',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
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
