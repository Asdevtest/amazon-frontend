import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: '10px',

    width: '100%',
    height: '100%',
  },

  tableWrapper: {
    flex: 1,
  },

  searchInput: {
    width: '320px',
  },
}))
