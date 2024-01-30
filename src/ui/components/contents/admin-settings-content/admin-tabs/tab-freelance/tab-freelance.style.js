import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    gap: 30,
  },

  textFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,

    '> div': {
      margin: 0,
    },
  },

  textField: {
    width: 410,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid #E0E0E0',
    borderRadius: 4,
  },

  label: {
    maxWidth: 410,
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  saveButton: {
    width: 123,
    height: 40,
  },
}))
