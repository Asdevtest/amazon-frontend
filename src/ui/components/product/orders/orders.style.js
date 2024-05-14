import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    gap: 5,
    width: '100%',
    flexDirection: 'column',
    height: '81vh',
  },

  modalWrapper: {
    height: 670,
  },
}))
