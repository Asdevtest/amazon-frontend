import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    width: 540,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 20,
  },

  input: {
    height: '36px',
    backgroundColor: 'inherit',
  },

  field: {
    margin: 0,
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  inputAdornment: {
    position: 'absolute',
    left: 0,
  },

  inputAdornmentVisibility: {
    position: 'absolute',
    right: 0,
  },

  visibilityIcon: {
    cursor: 'pointer',
    color: theme.palette.text.second,
  },

  formFooter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  forgotPassword: {
    fontSize: '14px',
    lineHeight: '19px',
    cursor: 'pointer',
    transition: '0.3s ease',
    color: theme.palette.text.second,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  rememberText: {
    fontSize: '14px',
    lineHeight: '19px',
  },
}))
