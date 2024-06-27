import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: 10,
  },

  link: {
    width: '300px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },

  title: {
    fontSize: '24px',
    color: theme.palette.text.general,
  },

  text: {
    color: theme.palette.text.second,
  },
}))
