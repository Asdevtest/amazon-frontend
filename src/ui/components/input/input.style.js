// import {createStyles} from '@material-ui/styles'

export const styles = () => ({
  root: {
    height: '32px',
    width: '100%',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    flexShrink: '0',
    '&$disabled': {
      backgroundColor: '#e4e7ea',
    },
  },
  input: {
    paddingLeft: '8px',
    paddingRight: '8px',
    color: 'rgba(61, 81, 112, 1)',

    '&:-webkit-autofill': {
      borderRadius: '4px',
    },
  },
  focused: {
    border: '1px solid rgba(0, 123, 255, 1)',
  },
  disabled: {},
})

export const stylesWithIcon = () => ({
  root: {
    height: '32px',
    width: '100%',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    flexShrink: '0',
    '&$disabled': {
      backgroundColor: '#e4e7ea',
    },
  },
  input: {
    paddingLeft: '40px',
    paddingRight: '40px',
    color: 'rgba(61, 81, 112, 1)',

    '&:-webkit-autofill': {
      borderRadius: '4px',
    },
  },
  focused: {
    border: '1px solid rgba(0, 123, 255, 1)',
  },
  disabled: {},
})
