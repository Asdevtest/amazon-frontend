import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    marginTop: 20,
    width: '100%',
    height: '62vh',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  filters: {
    marginTop: 20,
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
}))
