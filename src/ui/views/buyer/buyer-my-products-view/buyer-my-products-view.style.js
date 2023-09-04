export const styles = theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  dataGridWrapper: {
    height: '82vh',
  },

  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.general,
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
  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
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
