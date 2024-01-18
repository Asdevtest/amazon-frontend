import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    marginLeft: '10px',
  },
  conditionsField: {
    width: '100%',
    minHeight: '300px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  nameField: {
    width: '100%',
    minHeight: '60px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  title: {
    marginBottom: '20px',
  },
}))
