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

  supplierActionsWrapper: {
    display: 'flex',
  },
  supplierContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '16px',
  },

  iconBtnAcceptRevoke: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },

  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },

  labelsInfoWrapper: {
    display: 'flex',
    gap: '27px',
  },

  stantartSelect: {
    '&:hover': {
      backgroundColor: theme.palette.background.second,
      opacity: 0.8,
    },
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
    whiteSpace: 'nowrap',
  },

  inputField: {
    width: 225,
    height: 40,
  },

  trackNumberPhotoBtn: {
    width: 225,
  },

  trackNumberPhotoWrapper: {
    width: 225,
    height: 137,

    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trackNumberPhoto: {
    width: 225,
    height: 137,
    objectFit: 'contain',
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
    },
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
  },
  amazonTitle: {
    width: '210px',
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    textAlign: 'left',
    height: 80,

    display: '-webkit-box',
    '-webkitLineClamp': 3,
    '-webkitBoxOrient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

    color: theme.palette.input.customDisabled,
  },

  orange: {
    color: '#F3AF00 !important',
  },

  red: {
    color: 'red !important',
  },

  green: {
    color: `${theme.palette.text.green} !important`,
  },
  priorityWrapper: {
    width: 210,
  },

  priorityTitle: {
    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: 10,
  },
  rushOrderWrapper: {
    display: 'flex',
    marginBottom: 15,
  },
  rushOrderImg: {
    marginRight: 10,
  },
  rushOrder: {
    color: theme.palette.text.main,
  },
  sharpCell: {
    width: 10,
  },
  createdCell: {
    width: 65,
  },
  statusCell: {
    width: 60,
  },
  productCell: {
    width: 210,
  },
  finalWeightCell: {
    width: 90,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  grossWeightCell: {
    width: 90,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
}))
