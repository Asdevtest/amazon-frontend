import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '950px',
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
  },

  updated: {
    fontSize: 14,
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
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },

  inStock: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 5,
    width: '100%',
  },

  field: {
    width: 'auto !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 !important',
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
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  amazonTitle: {
    maxWidth: 270,
    minHeight: '50px',
  },

  infoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  table: {
    margin: '30px 0px',
  },

  tableCell: {
    border: 'none',
    verticalAlign: 'top',
  },

  tableWrapper: {
    marginTop: 10,
    width: '100%',
    height: '400px',
    [theme.breakpoints.down(1500)]: {
      height: 200,
    },
  },

  amountInPendingOrders: {
    marginLeft: 5,
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
