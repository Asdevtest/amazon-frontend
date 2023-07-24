export const styles = theme => ({
  formFields: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  field: {
    flexBasis: '100%',
    position: 'relative',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: '-12px',
  },
  label: {
    fontSize: '14px',
    cursor: 'pointer',

    color: theme.palette.text.general,
  },
  formFooter: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    width: '100%',
  },

  loginBtn: {
    width: 200,
    height: 40,
    color: '#fff',
    boxShadow: 'none',

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  forgotPassword: {
    marginLeft: '20px',
    fontSize: '14px',
    transition: '0.3s ease',
    cursor: 'pointer',

    color: theme.palette.text.second,

    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: '500',
    },
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

  input: {
    height: '34px',

    backgroundColor: 'inherit',
    color: theme.palette.text.general,
  },
  labelField: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
  },
})
