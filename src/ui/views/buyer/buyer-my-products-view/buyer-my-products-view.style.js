export const styles = theme => ({
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  attentionRow: {
    boxShadow: 'inset 0 0 15px rgba(247, 179, 7, .8)',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
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

  ideaRow: {
    '&:before': {
      content: '""',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'url(/assets/icons/idea-trgl.svg)'
          : 'url(/assets/icons/idea-trgl-dark-theme.svg)',

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },
})
