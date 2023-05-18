import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '380px',

    padding: 0,
  },

  button: {
    marginRight: '10px',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },
  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
    color: theme.palette.text.general,
  },
  divider: {
    margin: '0 30px',
  },
  img: {
    width: '66px',
    height: '66px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.general,
    marginBottom: theme.spacing(1),
  },

  boxTitle: {
    color: theme.palette.text.second,
  },

  notAvailable: {
    color: theme.palette.text.second,
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '299px',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'wrap',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
  },

  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '80px',
    height: '40px',
  },
  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  itemsWrapper: {
    // display: 'flex',
    // alignItems: 'center',
    // gap: '25px',
  },
  asinWrapper: {
    display: 'flex',
    gap: '10px',
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
  orderInput: {
    width: '79px',
  },
  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },
  field: {
    margin: '0',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  destinationSelect: {
    height: '40px',
  },
  storekeeperDisableBtn: {
    // backgroundColor: '#e4e7ea',

    borderRadius: '4px',
    padding: '6px 7px',

    // color: '#001029',

    backgroundColor: theme.palette.input.customDisabled,
  },
  fieldInput: {
    height: '40px',
  },
  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'end',
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
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },
  shippingLabelWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
}))
