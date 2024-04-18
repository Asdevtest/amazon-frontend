import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 600,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  patchNotes: {
    height: 320,
    overflowY: 'auto',
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'unset',
    },
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
