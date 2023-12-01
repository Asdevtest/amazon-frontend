import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  leftBtnsWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))
