import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '76vh',
  },

  modalWrapper: {
    height: 620,
  },

  addProductBtnsWrapper: {
    display: 'flex',
    gap: 20,
    marginBottom: 10,
  },
}))
