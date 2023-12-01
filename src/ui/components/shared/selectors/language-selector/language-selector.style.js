import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  title: {
    borderRadius: 4,
    width: 'auto',
    margin: 0,
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: '18px',
  },

  option: {
    width: 'auto',
    padding: '6px',
    textAlign: 'center',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.8',
      borderRadius: 4,
    },
  },

  selectedBtn: {
    color: 'white !important',
  },

  languageTagWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,

    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: '.8',
    },
  },
  languageOptionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 10,
  },
}))
