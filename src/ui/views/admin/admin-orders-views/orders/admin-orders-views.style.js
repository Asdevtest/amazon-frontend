export const styles = theme => ({
  filterBtnWrapper: {
    marginBottom: '10px',
    paddingLeft: '8px',
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

  datagridWrapper: {
    marginTop: '10px',
    height: '70vh',
    width: '100%',
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
