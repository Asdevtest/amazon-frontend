import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  files: {
    position: 'relative',
    padding: 3,
    height: 175,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    overflow: 'auto',
  },

  button: {
    padding: '6px 0',
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },
}))
