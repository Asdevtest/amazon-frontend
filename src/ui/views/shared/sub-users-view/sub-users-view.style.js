export const styles = theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '290px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  subUserHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
    },
  },

  addUserButton: {
    display: 'flex',
    gap: 10,
    padding: '8px 20px 8px 15px',
    height: '40px',

    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '79vh',
    width: '100%',
  },

  buttonWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
})
