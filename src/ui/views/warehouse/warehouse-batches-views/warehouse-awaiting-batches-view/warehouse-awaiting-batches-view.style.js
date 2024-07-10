import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftBtnsWrapper: {
    display: 'flex',
    gap: 20,
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '80vh',
    width: '100%',
  },

  searchInput: {
    width: 480,
  },
}))
