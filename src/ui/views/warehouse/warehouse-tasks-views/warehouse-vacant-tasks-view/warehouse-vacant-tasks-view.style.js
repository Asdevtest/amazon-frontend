import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  successRow: {
    boxShadow: 'inset 0 0 35px rgba(0, 255, 0, .5)',
  },

  searchInput: {
    width: '450px',
  },
}))
