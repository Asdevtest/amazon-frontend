import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
