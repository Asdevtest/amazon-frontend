import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    height: '74vh',
    width: '100%',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searchInput: {
    width: 470,
  },

  successRow: {
    boxShadow: 'inset 0 0 35px rgba(0, 255, 0, .5)',
  },
}))
