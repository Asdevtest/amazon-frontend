import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 920,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  text: {
    color: theme.palette.text.second,
  },

  tableWrapper: {
    height: 230,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
