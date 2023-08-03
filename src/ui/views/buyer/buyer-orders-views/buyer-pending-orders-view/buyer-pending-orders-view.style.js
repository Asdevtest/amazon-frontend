export const styles = theme => ({
  dialogContextClassName: {
    width: '1200px',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
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

  dataGridWrapper: {
    height: '82vh',
  },
})
