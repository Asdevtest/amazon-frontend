import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  toolbar: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  tableTitle: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },

  actionsButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  visibilityButton: {
    width: 32,
    height: 32,
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

    '&:active': {
      boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    },
  },

  visibilityIcon: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.primary.main,
  },
}))
