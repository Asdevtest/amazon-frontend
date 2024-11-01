import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  contactsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  title: {
    fontSize: '12px',
    color: theme.palette.text.second,
  },
}))
