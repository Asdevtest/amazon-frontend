import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  tableWrapper: {
    height: '65vh',
    width: '100%',
  },
}))
