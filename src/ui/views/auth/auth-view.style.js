export const styles = theme => ({
  root: {
    display: 'flex',

    height: '100%',
    flex: 1,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
    },
  },

  error: {
    color: theme.palette.text.second,
  },
})
