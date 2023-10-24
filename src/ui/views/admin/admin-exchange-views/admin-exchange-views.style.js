export const styles = theme => ({
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

  datagridWrapper: {
    height: '74vh',
  },
})
