import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 'fit-content',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    p: {
      textAlign: 'right',
      width: 'fit-content',
    },
    div: {
      width: 'fit-content',
    },
  },

  multilineLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',

    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
      textDecoration: 'underline',
    },
  },
}))
