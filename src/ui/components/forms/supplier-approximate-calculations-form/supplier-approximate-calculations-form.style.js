import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '90vw',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
