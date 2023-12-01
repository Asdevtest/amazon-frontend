import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  fourMonthesStockWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
  },

  fourMonthesStockLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '5px',
  },
}))
