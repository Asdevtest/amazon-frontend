export const styles = theme => ({
  backBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '30px',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
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

  noDataText: {
    textAlign: 'center',
    marginTop: 300,
  },

  title: {
    margin: '10px 0',
    color: theme.palette.text.general,
  },
})
