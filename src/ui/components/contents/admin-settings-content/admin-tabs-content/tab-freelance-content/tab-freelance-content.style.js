import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  textFieldUnSelection: {
    width: '100%',
    minHeight: '40px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',

    fontWeight: '400',
    lineHeight: '1.5',

    '& > ::selection': {
      userSelect: 'none',
    },
  },

  textField: {
    width: '100%',
    minHeight: '40px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',

    fontWeight: '400',
    lineHeight: '1.5',
  },

  placeAddBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  submitButton: {
    width: '165px',
    height: '40px',
  },

  unselectable: {
    userSelect: 'none',
  },
}))
