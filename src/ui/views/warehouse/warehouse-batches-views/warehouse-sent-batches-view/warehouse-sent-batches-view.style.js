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
    height: '75vh',
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
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '82vh',
  },
  '@media (max-width: 768px)': {
    toolbarContainer: {
      visibility: 'hidden',
    },
  },
}))
