import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 30,

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

  saveButton: {
    width: 123,
    height: 40,
  },
}))
