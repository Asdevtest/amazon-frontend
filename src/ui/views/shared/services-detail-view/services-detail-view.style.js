export const styles = theme => ({
  dataGridWrapper: {
    marginTop: 20,
  },

  root: {
    height: '49vh',
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 7,
  },

  row: {
    transition: '0.3s ease',
    cursor: 'pointer',
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
