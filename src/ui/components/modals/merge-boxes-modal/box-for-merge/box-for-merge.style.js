import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '380px',
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
    backgroundColor: '#F8F8F8',
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },
  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
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
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
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
    color: theme.palette.text.secondary,
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
    color: '#656565',
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
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
    color: '#656565',
  },
  destinationSelect: {
    height: '40px',
  },
  storekeeperDisableBtn: {
    backgroundColor: '#e4e7ea',
    borderRadius: '4px',
    padding: '6px 7px',
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
    color: '#006CFF',
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
