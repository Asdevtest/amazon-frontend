import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '5px',
  },

  title: {
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'nowrap',
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
