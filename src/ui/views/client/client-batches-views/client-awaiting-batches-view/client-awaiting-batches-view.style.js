export const styles = theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  button: {
    marginRight: '24px',
  },
  buttonsWrapper: {
    textAlign: 'right',
  },
  tableWrapper: {
    marginTop: '24px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  btnsWrapper: {
    width: '100%',

    margin: '10px 0 15px',
    display: 'flex',

    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 30,
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
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
  datagridWrapper: {
    marginTop: '10px',
    height: '80vh',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  cancelBtn: {
    whiteSpace: 'nowrap',
  },

  boxesFiltersWrapper: {
    marginTop: '5px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: '5px solid #0460DE',

    color: `${theme.palette.primary.main} !important`,
  },

  storekeeperButton: {
    padding: '0 45px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,

    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },
})
