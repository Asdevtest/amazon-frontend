import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  productMyRequestsBtnsWrapper: {
    display: 'flex',
    width: '100%',
    gap: '30px',
  },

  productMyRequestsBtn: {
    width: '140px',
    height: 30,
  },
}))
