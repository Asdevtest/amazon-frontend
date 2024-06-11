export const styles = theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '310px',
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '82vh',
    width: '100%',
  },

  usersOnlineWrapper: {
    position: 'relative',
    minWidth: 125,
    '&:after': {
      content: '""',
      position: 'absolute',
      margin: 'auto',
      bottom: 0,
      top: 0,
      right: 0,
      width: 7,
      height: 7,
      backgroundColor: '#28a745',
      borderRadius: '50%',
    },
  },

  switcherWrapper: {
    marginInline: 5,
  },
})
