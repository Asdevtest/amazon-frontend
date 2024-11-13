import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  // common styles for orders and supplier search
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 20,
    background: theme.palette.background.general,
    padding: 20,
    borderRadius: 16,
    width: 'max-content',

    '> div': {
      margin: 0,
    },
  },

  textField: {
    width: 430,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  label: {
    maxWidth: 430,
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.second,
  },
}))
