export const styles = theme => ({
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
  },

  attentionRow: {
    boxShadow: 'inset 0 0 15px rgba(247, 179, 7, .8)',
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

  ideaRowGreen: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldGreen,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  ideaRowYellow: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldYellow,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  dataGridWrapper: {
    height: '82vh',
  },
})
