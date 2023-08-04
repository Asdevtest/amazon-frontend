export const styles = theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  filterBtnWrapper: {
    marginBottom: 20,
  },

  filterBtn: {
    marginLeft: '10px',
    color: theme.palette.primary.main,
    marginBottom: '5px',

    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  currentFilterBtn: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    fontWeight: 'bold',
    marginBottom: '0',

    borderBottom: theme.palette.other.tableActiveFilterBtn,
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
  datagridWrapper: {
    height: '74vh',
  },
})
