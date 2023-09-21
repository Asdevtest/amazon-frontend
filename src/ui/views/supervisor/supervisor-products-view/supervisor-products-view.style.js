export const styles = theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  attentionRow: {
    position: 'relative',
    background: theme.palette.background.yellowRow,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,
      width: 5,
      height: '98%',
      background: '#C69109',
    },
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
    marginTop: '20px',
    height: '70vh',
  },

  selectStatusFilterButton: {
    padding: '0 20px',
    height: 40,
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '10px',
    fontSize: 14,
    fontWeight: 600,
    '&.Mui-disabled': {
      opacity: '.3',
      backgroundColor: 'transparent',
    },
  },
  badge: {
    height: 20,
    width: 'fit-content',
    background: theme.palette.primary.main,
    padding: '1px 6px',
    fontSize: '12px',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  selectedStatusFilterButton: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  searchInputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  searchInput: {
    width: '100%',
    maxWidth: 320,
  },
})
