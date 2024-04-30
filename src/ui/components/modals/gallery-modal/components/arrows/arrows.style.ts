import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
  },

  fixedHeight: {
    height: 28,
  },

  title: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 500,
    color: theme.palette.text.general,
  },

  iconButton: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.general,
    border: `1px solid ${theme.palette.background.second}`,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  icon: {
    path: {
      stroke: theme.palette.text.second,
    },
  },
}))
