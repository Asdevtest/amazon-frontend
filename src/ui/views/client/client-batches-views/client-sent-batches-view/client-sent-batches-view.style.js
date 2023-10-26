export const styles = theme => ({
  button: {
    marginRight: '24px',
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '73vh',
    width: '100%',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },
  btnsWrapper: {
    width: '100%',

    margin: '10px 0 15px',
    display: 'flex',

    justifyContent: 'space-between',
  },
  openArchiveBtn: {
    minWidth: 230,
    padding: '0 30px 0 30px',
    color: theme.palette.text.general,
  },

  archiveAddBtn: {
    width: 230,
    display: 'flex',
    gap: 10,
    border: `1px solid ${theme.palette.other.rejected}`,
    color: theme.palette.other.rejected,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      border: `1px solid ${theme.palette.other.rejected}`,
      opacity: 0.6,
    },

    '&:disabled': {
      borderColor: '#FEB9B9',
      color: '#FEB9B9',
    },

    '&.Mui-disabled': {
      background: 'none',
    },
  },
  simpleBtnsWrapper: {
    display: 'flex',
    gap: '30px',
    paddingRight: '5px',
  },

  boxesFiltersWrapper: {
    display: 'flex',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  storekeeperButton: {
    padding: '0 45px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },
})
