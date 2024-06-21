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

  btnsWrapper: {
    margin: '10px 0 15px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  datagridWrapper: {
    marginTop: 20,
    height: '74vh',
    width: '100%',
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
