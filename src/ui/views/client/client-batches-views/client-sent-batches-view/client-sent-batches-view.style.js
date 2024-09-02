import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 450,
  },
}))
