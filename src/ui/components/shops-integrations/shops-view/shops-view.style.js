export const styles = theme => ({
  test: {
    padding: theme.spacing(7),
  },
  buttonBox: {
    textAlign: 'left',
    marginRight: '0',
    padding: '16px',
    display: 'flex',
  },

  datagridWrapper: {
    marginTop: '10px',
    height: '74vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: '#fff',

    backgroundColor: theme.palette.background.main,
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
