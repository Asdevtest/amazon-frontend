import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
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
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0',
  },

  leftBtnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },

  addBtn: {
    height: '36.5px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
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

  searchInput: {
    border: '1px solid #007bff',
    width: '290px',
    height: '40px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchContainer: {
    marginTop: 0,
    width: 'auto',
    // marginRight: 'calc(50% - 345px)',
    [theme.breakpoints.down(768)]: {
      marginTop: 0,
      width: '100%',
      marginRight: 0,
    },
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}))
