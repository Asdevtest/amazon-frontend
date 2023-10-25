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

  shopsFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  dataGridWrapper: {
    height: '72vh',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
})
