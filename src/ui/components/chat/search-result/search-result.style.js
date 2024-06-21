import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchResultWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  searchResult: {
    width: '150px',
    color: theme.palette.text.second,
  },

  searchIconBtn: {
    color: theme.palette.text.second,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  dropUpOrDownWrapper: {
    display: 'flex',
    gap: 10,
  },

  searchDisabledIconBtn: {
    color: theme.palette.action.disabled,
    cursor: 'auto',

    '&:hover': {
      transform: 'none',
    },
  },
}))
