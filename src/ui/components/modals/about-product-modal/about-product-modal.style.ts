import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '950px',
    padding: '10px',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  updated: {
    fontSize: 14,
  },
  inStock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  waitOrder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountOrder: {
    color: theme.palette.primary.main,
    fontSize: 14,
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
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '50px',
  },
  amazonTitle: {
    maxWidth: 270,
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
