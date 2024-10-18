import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
  },

  dropdown: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  alignRight: {
    justifyContent: 'flex-end',
  },

  selected: {
    backgroundColor: theme.palette.background.activeChat,
    borderRadius: 10,
    padding: '2px',
  },
}))
