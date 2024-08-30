import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    gap: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '74vh',
  },

  modalWrapper: {
    height: 650,
  },

  addProductBtnsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))
