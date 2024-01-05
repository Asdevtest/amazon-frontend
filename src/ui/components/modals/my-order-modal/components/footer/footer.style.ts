import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linkToNewTab: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.general,
    borderRadius: '50%',
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  icon: {
    width: '20px !important',
    height: '20px !important',

    path: {
      stroke: theme.palette.text.second,
    },
  },

  button: {
    padding: '8px 24px',
    color: '#912018',
    fontWeight: 500,
    background: '#fee4e2',
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: 24,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },
}))
