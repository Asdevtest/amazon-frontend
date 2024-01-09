import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '950px',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  updated: {
    fontSize: 14,
  },
  contentWrapperClassName: {
    padding: '10px 20px 25px 20px',
  },
  additionPurchaseWrap: {
    marginTop: '-10px',
  },
  toPurchase: {
    fontSize: 14,
    fontWeight: 600,
  },
  inputAdditionPurchase: {
    width: 95,
    height: 25,
  },
  fieldText: {
    fontSize: 14,
    fontWeight: 600,
  },
  infoHeader: {
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.text.second,
  },
  fieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  inStock: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  field: {
    width: 'auto !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  waitOrder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountOrder: {
    color: theme.palette.primary.main,
    fontSize: 14,
    textAlign: 'right',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopName: {
    overflow: 'hidden',
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
    width: '200px',
    marginBottom: 8,
  },
  showAttributeName: {
    color: theme.palette.text.second,
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '50px',
  },
  amazonTitle: {
    maxWidth: 270,
    minHeight: '50px',
  },
  infoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  table: { margin: '30px 0px' },
  tableCell: {
    border: 'none',
    verticalAlign: 'top',
  },
  tableWrapper: {
    marginTop: 10,
    width: '100%',
    height: '425px',
    [theme.breakpoints.down(1500)]: {
      height: 200,
    },
  },
  amountInPendingOrders: {
    marginLeft: 5,
  },
  inStockField: {
    width: '126px !important',
  },
  storekeeperName: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    maxWidth: 90,
    overflow: 'hidden',
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
