import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },

  searchInput: {
    width: '530px',
  },

  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
}))
