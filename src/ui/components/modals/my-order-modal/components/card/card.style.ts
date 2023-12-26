import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  card: {
    padding: 12,
    borderRadius: 12,
    boxShadow: theme.palette.boxShadow.paper,
  },
}))
