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
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 0 10px',
  },
  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',
  },
  buttonsWrapper: {
    marginTop: '15px',
  },
  button: {
    marginBottom: 5,
  },

  tableWrapper: {
    minWidth: '100%',
  },

  isDraftRow: {
    opacity: '.5',
  },

  tasksWrapper: {
    marginTop: '30px',

    height: '63vh',
  },

  boxesFiltersWrapper: {
    marginTop: '5px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
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

  dataGridWrapper: {
    height: '73vh',
    overflow: 'auto',
  },

  virtualScrollerContent: {
    maxHeight: '69vh',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
  },

  topHeaderBtnsWrapper: {
    paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: '#001029',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: '#fff',
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
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
}))
