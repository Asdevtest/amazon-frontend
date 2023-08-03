import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,

    [theme.breakpoints.down(768)]: {
      width: 'auto',
      minHeight: '100%',
      justifyContent: 'space-between',
      gap: 20,
    },
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  option: {
    padding: 0,
  },

  customBtnNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    padding: '10px 15px',
  },

  selectContainer: {
    margin: '0 !important',
    flex: '1 1 auto',
  },

  button: {
    width: 120,

    [theme.breakpoints.down(768)]: {
      width: 90,
    },
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  isFocusedOption: {
    transition: '.3s ease',

    '&:hover': {
      backgroundColor: '#CCE2FF',
    },
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))
