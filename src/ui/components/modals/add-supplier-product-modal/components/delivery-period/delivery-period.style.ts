import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  deliveryPeriodWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'flex-end',
  },

  deliveryPeriodInputsWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))
