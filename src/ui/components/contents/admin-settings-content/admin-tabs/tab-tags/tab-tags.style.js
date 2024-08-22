import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 290,
    height: 40,
  },

  tableWrapper: {
    height: '77vh',
    width: '100%',
  },
}))
