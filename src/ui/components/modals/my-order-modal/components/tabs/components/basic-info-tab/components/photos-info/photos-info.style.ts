import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 210,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontWeight: 600,
  },

  cardsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },

  photosCard: {
    justifyContent: 'center',
  },

  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  fieldText: {
    fontSize: 14,
    lineHeight: '23px',
    color: theme.palette.text.general,

    '&:hover': {
      opacity: 1,
    },
  },

  iconButton: {
    width: 24,
    height: 24,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'auto',
    },
  },

  eyeIcon: {
    color: theme.palette.primary.main,
  },
}))
