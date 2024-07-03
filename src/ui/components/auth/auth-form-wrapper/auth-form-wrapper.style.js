import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  rightPanel: {
    position: 'relative',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formWrapper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  formHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '500',
    color: theme.palette.primary.main,
  },

  divider: {
    margin: '8px 0 16px',
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  redirect: {
    margin: '0 30px',
    fontSize: '14px',
    lineHeight: '19px',
    transition: '0.3s ease',
    cursor: 'pointer',
    color: theme.palette.text.second,

    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: '500',
    },
  },

  redirectWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  version: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },

  selectorsWrapper: {
    width: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))
