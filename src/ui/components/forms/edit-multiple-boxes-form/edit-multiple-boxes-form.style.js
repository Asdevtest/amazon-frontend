import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',

    position: 'relative',
    maxHeight: '85vh',
  },

  boxesWrapper: {
    display: 'flex',
    gap: '40px',

    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '36px',
    marginTop: '40px',
    justifySelf: 'flex-end',

    position: 'sticky',
    bottom: 0,
  },

  inputAccent: {
    outline: '2px solid #F5CF00',
  },

  containerAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
    padding: 3,
  },

  checkboxContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
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
    color: theme.palette.text.general,
  },

  applyButton: {
    height: 26,
    width: 90,
    transition: '0.3s ease',
  },

  applyButtonClicked: {
    backgroundColor: 'green',
    '&: hover': {
      backgroundColor: 'green',
    },
  },

  box: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  orderWrapper: {
    width: '100%',
    flexGrow: 1,
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
    width: '100%',

    flexGrow: 1,
  },
  orderInput: {
    width: '79px',
  },

  img: {
    width: '66px',
    height: '66px',

    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
  },

  deleteBtn: {
    color: theme.palette.text.second,
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '299px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    height: 45,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  sharedItemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },

  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '8px',
    width: 230,
    height: '40px',
  },
  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  barcodeChiplabel: {
    width: 350,
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },

  modalText: {
    marginBottom: '5px',
  },

  storekeeperBtn: {
    height: '40px',
  },

  storekeeperTrafficBtn: {
    color: theme.palette.text.general,
  },

  fieldInput: {
    height: '40px',
  },

  superBox: {
    color: theme.palette.primary.negativeMain,
    fontSize: 20,
  },

  currentBoxTitle: {
    display: 'flex',
    gap: '23px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: '10px',
    justifyContent: 'space-between',
  },

  searchCount: {
    color: theme.palette.primary.main,
    fontSize: 14,
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
  },

  icon: {
    padding: 4,
  },
  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
  },

  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  storekeeperBtnDefault: {
    color: theme.palette.text.general,
  },
}))
