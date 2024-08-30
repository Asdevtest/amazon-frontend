import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 290,
    height: 40,
  },
}))
