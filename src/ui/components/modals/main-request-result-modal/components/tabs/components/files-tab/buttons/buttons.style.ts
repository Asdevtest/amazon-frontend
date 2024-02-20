import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  flexlContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  checkbox: {
    padding: 2,
  },

  text: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  button: {
    padding: 5,
    height: '100%',
    overflow: 'hidden',
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:disabled': {
      svg: {
        opacity: 0.5,
      },
    },
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },
}))
