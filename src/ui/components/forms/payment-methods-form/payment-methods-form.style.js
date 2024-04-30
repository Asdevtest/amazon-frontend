import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: '1320px',
    padding: 10,
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
    marginRight: 10,
  },

  actionButton: {
    padding: '0 25px',
  },
}))
