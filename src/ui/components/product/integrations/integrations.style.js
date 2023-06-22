import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '80vh',
  },

  modalWrapper: {
    height: 605,
  },

  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    padding: '10px',
  },

  buttonOffset: {
    marginLeft: 20,
  },
}))
