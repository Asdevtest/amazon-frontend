export const styles = theme => ({
  button: {
    marginBottom: 5,
    color: theme.palette.text.general,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  shopsFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  dataGridWrapper: {
    height: '72vh',
    overflow: 'auto',
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

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
})
