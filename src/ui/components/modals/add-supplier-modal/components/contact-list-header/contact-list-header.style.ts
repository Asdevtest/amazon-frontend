import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  listHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: {
      fontSize: '12px',
      color: theme.palette.text.second,
    },
  },
}))
