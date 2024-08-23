import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: '1320px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  payments: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 25,
    maxHeight: 570,
    overflowY: 'auto',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 30,
  },
}))
