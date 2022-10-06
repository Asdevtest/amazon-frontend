// import {createStyles} from '@material-ui/styles'

export const styles = theme => ({
  root: {},
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
    top: 41,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
  },

  validationTitle: {
    fontSize: '14px',
    color: '#656565',
  },

  validationText: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#656565',
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
    color: '#656565',
  },

  input: {
    height: '34px',
  },
})
