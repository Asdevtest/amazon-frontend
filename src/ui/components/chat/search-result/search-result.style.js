import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  searchResultWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },

  searchResult: {
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

  searchResultNum: {
    color: theme.palette.text.general,
    marginLeft: 5,
  },

  dropUpOrDownWrapper: {
    display: 'flex',
    gap: 10,
    margin: '0 15px',
  },

  searchDisabledIconBtn: {
    color: theme.palette.action.disabled,

    cursor: 'auto',

    '&:hover': {
      transform: 'none',
    },
  },
}))
