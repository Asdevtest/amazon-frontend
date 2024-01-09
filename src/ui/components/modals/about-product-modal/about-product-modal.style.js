import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '900px',
    padding: 10,
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
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amazonTitle: {
    maxWidth: 270,
  },
  tableWrapper: {
    marginTop: 10,
  },
}))
