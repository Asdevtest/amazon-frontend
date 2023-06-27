import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalText: {
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '36px',
    marginBottom: '10px',
  },

  supplierActionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  supplierContainer: {
    display: 'flex',
    gap: '16px',
  },
  iconBtnAccept: {
    backgroundColor: 'rgba(30, 220, 30, 1)',
  },
  iconBtnAcceptRevoke: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },

  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    borderRadius: '4px',

    '&:hover': {},
  },

  InfoWrapper: {
    width: '100%',
    display: 'flex',
  },

  labelsInfoWrapper: {
    display: 'flex',
    gap: '27px',
  },

  fieldWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
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
    marginBottom: 10,
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
    minWidth: 800,
  },
  paper: {
    height: 'max-content',
    width: '100%',
  },

  buttonsBox: {
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
  },
  saveBtn: { width: '190px', height: '40px' },
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
  deadlineWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  hidden: {
    display: 'none',
  },

  label: {
    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: 10,
    whiteSpace: 'nowrap',
  },

  deadlineText: {
    marginLeft: 5,
  },

  alertText: {
    color: '#FF1616',
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
    paddingBottom: 30,
    paddingTop: 20,
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

  addBoxTitle: {
    marginBottom: '10px',
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '140%',
  },
  addBoxButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  addBoxButtonAndCommentsWrapper: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
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
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
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

  commentInput: {
    fontSize: '14px',
    marginTop: '2px',
    width: 510,
    height: 107,
    padding: 0,
  },

  inputWrapper: {
    height: 'auto',
  },
  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  supplierButtonText: {
    width: '98px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },
  supplierCheckboxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
  },
  checkboxTitle: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },
  seeCommentsButton: {
    display: 'flex',
    padding: '0 38px',

    gap: 20,
  },
  seeCommentsText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
  },
}))
