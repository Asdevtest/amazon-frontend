import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  deliveryPeriodWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'flex-end',
    width: '45%',
  },

  deliveryPeriodInputsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },
}))
