export const styles = theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },
  root: {
    height: '80vh',
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
  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
    overflow: 'visible',
  },
})
