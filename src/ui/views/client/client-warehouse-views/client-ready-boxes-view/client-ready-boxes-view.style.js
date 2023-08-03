export const styles = theme => ({
  button: {
    marginBottom: 5,
    marginRight: '10px',
    padding: '0 45px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  isDraftRow: {
    opacity: '.5',
  },

  boxesFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: theme.palette.other.tableActiveFilterBtn,

    color: `${theme.palette.primary.main} !important`,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  btnsWrapper: {
    margin: '10px 0 15px',
    display: 'flex',
    justifyContent: 'space-between',
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
    marginTop: 20,
    height: '74vh',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  returnButton: {
    whiteSpace: 'nowrap',
  },
})
