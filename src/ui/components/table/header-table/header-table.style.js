import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 20,
  },

  searchInput: {
    width: 550,
  },
}))
