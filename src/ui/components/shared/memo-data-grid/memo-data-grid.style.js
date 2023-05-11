import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    height: '32px',
    width: '100%',
    // border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    flexShrink: '0',

    // '&$disabled': {
    //   backgroundColor: '#e4e7ea',
    // },

    // '&:disabled': {
    //   backgroundColor: '#e4e7ea',
    //   color: '#001029 !important',
    // },
  },
  input: {
    paddingLeft: '8px',
    paddingRight: '8px',
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
    // color: '#001029 !important',
    border: 'none',
  },
}))
