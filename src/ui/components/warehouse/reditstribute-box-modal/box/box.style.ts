import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  box: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: 20,
  },

  img: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    objectPosition: 'center',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    width: '299px',
    color: theme.palette.text.general,
  },

  orderInput: {
    width: '79px',
    margin: 0,
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
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

  storekeeperBtnDefault: {
    color: '#ffff',
  },

  storekeeperBtn: {
    height: '40px',
  },

  storekeeperBtnColored: {
    color: theme.palette.text.negativeMain,
  },

  storekeeperDisableBtn: {
    borderRadius: '4px',
    padding: '6px 7px',
    backgroundColor: theme.palette.input.customDisabled,
  },

  fieldInput: {
    height: '40px',
  },

  inputAccent: {
    outline: '2px solid #F5CF00',
  },

  shippingLabelWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  miss: {
    color: theme.palette.text.second,
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

  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '30px',
  },

  footerTitle: {
    color: theme.palette.text.second,
  },

  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteBtn: {
    color: theme.palette.text.second,
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

  icon: {
    padding: 4,
  },

  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  labelWrapperStyles: {
    gap: '13px',
  },
}))
