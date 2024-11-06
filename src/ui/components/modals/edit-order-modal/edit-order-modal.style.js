import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  InfoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
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
    marginBottom: 10,
  },

  itemInputIcon: {
    color: theme.palette.primary.main,
    transition: '.3s ease',
  },

  modalSpanText: {
    color: theme.palette.text.second,
  },

  itemInput: {
    width: 125,
    height: 40,
  },

  modalWrapper: {
    width: 1200,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  buttonsBox: {
    marginTop: 20,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
  },

  deadlineWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
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
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 600,
  },

  alertText: {
    color: '#FF1616',
  },

  inputField: {
    width: 225,
    height: 40,
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

  amazonTitle: {
    width: '310px',
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '19px',
    display: '-webkit-box',
    WebkitLineClamp: 4,
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
    WebkitTextFillColor: '#F3AF00 !important',
  },

  red: {
    color: `${theme.palette.orderStatus.red} !important`,
    WebkitTextFillColor: `${theme.palette.orderStatus.red} !important`,
  },

  green: {
    color: `${theme.palette.text.green} !important`,
    WebkitTextFillColor: `${theme.palette.text.green} !important`,
  },

  blue: {
    color: `${theme.palette.primary.main} !important`,
    WebkitTextFillColor: `${theme.palette.primary.main} !important`,
  },

  priorityWrapper: {
    width: 150,
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
    marginBottom: 10,
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

  checkboxTitle: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },

  productCell: {
    width: 225,
  },

  boxesWrapper: {
    marginTop: 20,
  },
}))
