import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  modalText: {
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '36px',
    marginBottom: '10px',
  },

  idItemWrapper: {
    display: 'flex',
    gap: 15,
  },

  itemInputIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  modalSpanText: {
    color: theme.palette.text.second,
  },

  itemInput: {
    width: 125,
    height: 40,
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
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    textAlign: 'left',
  },

  orderStatus: {
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },

  disableSelect: {
    // color: 'rgba(0, 0, 0, .2) !important',

    color: theme.palette.input.disabled,
  },

  orange: {
    color: '#F3AF00 !important',
  },

  red: {
    color: 'red !important',
  },

  green: {
    color: 'green !important',
  },
}))
