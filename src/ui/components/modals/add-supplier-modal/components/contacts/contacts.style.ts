import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  contactsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  contactWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: '12px',
    color: theme.palette.text.second,
  },
}))
