import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    marginTop: 20,
    width: '100%',
    height: '80vh',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },

  filters: {
    display: 'flex',
    gap: '20px',
  },
}))
