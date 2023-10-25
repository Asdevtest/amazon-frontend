export const styles = theme => ({
  dataGridWrapper: {
    height: '82vh',
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: 320,
  },

  attentionRow: {
    position: 'relative',
    background: theme.palette.background.yellowRow,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 1,
      bottom: 2,
      width: 5,
      height: '96%',
      background: '#C69109',
      borderRadius: 2,
    },
  },

  attentionRowShort: {
    '&:before': {
      content: '""',
      height: '76%',
    },
  },

  ideaRowGreen: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 1,
      left: 1,
      backgroundImage: theme.palette.other.ideaProductSheldGreen,
      width: 48,
      height: 21,
    },
  },

  ideaRowYellow: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 1,
      left: 1,
      backgroundImage: theme.palette.other.ideaProductSheldYellow,
      width: 48,
      height: 21,
    },
  },
})
