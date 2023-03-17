/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },

  durationMainWrapper: {
    width: 'fit-content',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
  },

  inputsWrapper: {
    display: 'flex',

    width: 'fit-content',
  },
  inputWrapper: {
    display: 'flex',

    alignItems: 'center',

    width: 'fit-content',
  },
  inputField: {
    margin: '0 !important',
    padding: '0 !important',
  },
  input: {
    display: 'flex',
    // alignItems: 'center',
    width: 35,

    border: 'none',
    margin: '0 !important',
    padding: '0 !important',

    borderRadius: 0,

    '&:focus': {
      width: 35,
    },

    '& >::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
      // '-webkit-appearance': 'none',
      WebkitAppearance: 'none',
      margin: 0,
      padding: 0,
    },
  },
  inputLabel: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.general,
  },
}))
