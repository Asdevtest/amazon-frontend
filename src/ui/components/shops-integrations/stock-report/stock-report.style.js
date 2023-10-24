export const styles = theme => ({
  button: {
    marginBottom: 5,
    color: theme.palette.text.general,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  rightButton: {
    marginBottom: 5,
    marginLeft: 10,
  },

  shopsFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  btnsWrapper: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
  },

  dataGridWrapper: {
    height: '72vh',
    overflow: 'auto',
  },
})
