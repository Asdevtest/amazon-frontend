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

  inputAdornmentRight: {
    cursor: 'pointer',
  },

  fieldContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  validationMessages: {
    display: 'flex',
    gap: 5,
  },

  validationText: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  link: {
    color: theme.palette.primary.main,
  },

  red: {
    color: theme.palette.text.red,
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  termsContainer: {
    display: 'flex',
    gap: 5,
  },
}))
