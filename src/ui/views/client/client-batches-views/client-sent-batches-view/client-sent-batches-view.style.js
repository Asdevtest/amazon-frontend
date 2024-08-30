import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  searchInput: {
    width: 450,
  },

  datagridWrapper: {
    marginTop: 20,
    height: '80vh',
    width: '100%',
  },
}))
