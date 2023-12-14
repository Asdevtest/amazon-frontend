import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inStockWrapper: {
    width: '100%',
  },

  inStockSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  linkWrapper: {
    fontSize: 14,
    lineHeight: '19px',
    cursor: 'pointer',
  },
}))
