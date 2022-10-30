export const styles = theme => ({
  sendOwnProductBtn: {
    marginBottom: theme.spacing(2),
  },
  redistributionWrapper: {},
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },

  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',

    padding: 0,
  },
  buttonsWrapper: {
    marginTop: '15px',
  },
  button: {
    marginBottom: 5,
    marginRight: '10px',

    color: theme.palette.text.general,
  },

  tableWrapper: {
    minWidth: '100%',
  },

  isDraftRow: {
    opacity: '.5',
  },

  tasksWrapper: {
    marginTop: '30px',

    height: '60vh',
  },

  boxesFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  btnsWrapper: {
    margin: '10px 0 15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.main,

    backgroundColor: theme.palette.background.main,
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
    height: '77vh',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  returnButton: {
    whiteSpace: 'nowrap',
  },
})
