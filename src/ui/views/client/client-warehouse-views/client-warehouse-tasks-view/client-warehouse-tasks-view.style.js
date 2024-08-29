import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: '10px',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
}))
