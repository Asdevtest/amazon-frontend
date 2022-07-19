import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  modalText: {
    color: '#001029',
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '36px',
    marginBottom: '10px',
  },
  modalWrapper: {
    minWidth: '800px',
  },
  paper: {
    height: 'max-content',
    width: '100%',
  },
  divider: {
    margin: '10px -16px 10px',
  },
  buttonsBox: {
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
  },
  saveBtn: {width: '190px', height: '40px'},
  tableWrapper: {
    marginTop: '15px',
  },
  noBoxesText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  hidden: {
    display: 'none',
  },

  label: {
    fontSize: '18px',
  },

  addBtn: {},

  addBoxTitle: {
    marginBottom: '43px',
    marginTop: '40px',
    color: '#001029',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },
  addBoxButtonWrapper: {
    width: '229px',
    display: 'flex',
  },

  addBoxButton: {
    width: '229px',
    height: '40px',
  },

  fieldLabel: {
    margin: 0,
  },
  cancelBtn: {
    height: '40px',
    width: '190px',
    color: '#001029',
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: '#e4e4e4',

      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: '#c5c5c5',
    },
  },
  amazonTitle: {
    width: '417px',
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
  },

  orderStatus: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '10px',
  },

  status: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    padding: '10px 15px',
    border: '1px solid #e0e0e0',
    width: '100%',
    borderRadius: '4px',
  },

  orderStatusWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '247px',
  },

  modalHeader: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  tableTitleContainer: {
    marginTop: '30px',
    marginBottom: '10px',
  },

  tableTitle: {
    color: '#001029',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },
}))
