import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
    flex: 1,
  },

  deliveryField: {
    flex: 1,
  },
}))
