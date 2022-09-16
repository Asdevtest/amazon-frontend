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
    alignItems: 'center',
    margin: '15px 0',
  },

  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    gap: '20px',
  },

  editBtn: {
    width: '260px',
  },
  batchBtn: {
    width: '260px',
  },
  createBtn: {
    width: '200px',
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
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: '#fff',
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
    height: '75vh',
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
}))
