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
    display: 'flex',
    flexWrap: 'wrap',

    gap: 20,
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
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  button: {
    width: '138px',
    height: '40px',
  },
  dataGridWrapper: {
    marginTop: '20px',
    height: '83vh',
  },

  selectStatusFilterButton: {
    padding: '0 15px',
    height: 40,
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,

    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },
  selectedStatusFilterButton: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: '5px solid #0460DE',

    color: `${theme.palette.primary.main} !important`,
  },

  searchInputWrapper: {
    marginLeft: '40%',
  },
})
