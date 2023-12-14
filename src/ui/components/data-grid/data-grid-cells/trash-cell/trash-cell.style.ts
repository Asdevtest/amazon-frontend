import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  trashWrapper: {
    width: '100%',
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'inherit',
    outline: 'none',

    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  trashImg: {
    width: '20px',
    height: '20px',

    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
}))
