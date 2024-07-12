import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    height: '72vh',
    width: '100%',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searchInput: {
    width: 550,
  },
}))
