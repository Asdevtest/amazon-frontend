export const styles = theme => ({
  root: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
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
  checkbox: {
    marginLeft: '-12px',
  },
  formFooter: {
    width: '290px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2.5),
  },

  visibilityIcon: {
    position: 'absolute',
    right: 10,
    top: 35,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    [theme.breakpoints.down(768)]: {
      top: 35,
    },
  },

  inputAdornment: {
    position: 'absolute',
    left: 0,
  },

  validationMessage: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '-15px',

    justifyContent: 'start',
    gap: '5px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexWrap: 'wrap',
    },
  },

  validationTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
  },

  validationText: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  validationHiddenMessage: {
    display: 'flex',
    justifyContent: 'end',
  },

  validationHiddenText: {
    visibility: 'hidden',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  input: {
    height: '34px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  labelWrapper: {
    display: 'flex',
    gap: 10,
  },

  label: {
    color: theme.palette.text.general,
  },

  link: {
    color: theme.palette.primary.main,
  },

  red: {
    color: 'red !important',
  },

  visibility: {
    visibility: 'visible',
  },
  labelField: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
  },
  button: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
})
