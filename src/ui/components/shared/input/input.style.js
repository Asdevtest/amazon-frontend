export const styles = theme => ({
  root: {
    height: '32px',
    width: '100%',
    borderRadius: '4px',
    flexShrink: '0',
  },
  input: {
    padding: '9px 15px',
    color: theme.palette.text.general,
    fontFamily: 'Regular, sans-serif',

    '&:-webkit-autofill': {
      borderRadius: '4px',
    },
  },
  focused: {
    border: '1px solid rgba(0, 123, 255, 1)',
  },
  disabled: {
    backgroundColor: theme.palette.input?.customDisabled,
    border: 'none',
  },
})

export const stylesWithIcon = theme => ({
  root: {
    height: '32px',
    width: '100%',
    // border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    flexShrink: '0',
    '&$disabled': {
      backgroundColor: '#e4e7ea',
    },
  },
  input: {
    paddingLeft: '40px',
    paddingRight: '40px',
    color: theme.palette.text.general,

    '&:-webkit-autofill': {
      borderRadius: '4px',
    },
  },
  focused: {
    border: '1px solid rgba(0, 123, 255, 1)',
  },
  disabled: {
    backgroundColor: theme.palette.input.customDisabled,
  },
})
