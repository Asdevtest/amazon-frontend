import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  input: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
    // justifySelf: 'flex-start',
    margin: 0,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  closeIcon: {
    color: theme.palette.text.second,
    cursor: 'pointer',
    transition: '.3s ease',

    '&: hover': {
      transform: 'scale(1.1)',
    },
  },

  searchWrapper: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },

  submit: {
    padding: '6px',
  },
}))
