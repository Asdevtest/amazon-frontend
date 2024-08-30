import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },

  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
}))
