import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  box: {
    width: 527,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.box,
    borderRadius: '20px',
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
    width: '270px',
    color: theme.palette.text.general,
  },

  orderInput: {
    width: '120px',
  },

  label: {
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
    borderRadius: '7px',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  incomingBtnWrapper: {
    width: 105,
    display: 'flex',
    justifyContent: 'end',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    cursor: 'pointer',
  },

  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  icon: {
    padding: 8,
  },

  labelWrapperStyles: {
    gap: '19px',
  },

  blue: {
    color: theme.palette.text.main,
  },
}))
