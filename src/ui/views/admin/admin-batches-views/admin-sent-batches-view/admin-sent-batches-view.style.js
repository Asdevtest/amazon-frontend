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
  addProductBtnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0 0 10px',
  },

  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },

  btnsWrapper: {
    margin: '10px 0 15px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
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
  topHeaderBtnsWrapper: {
    paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
    height: 36,
    overflow: 'visible',
  },
})
