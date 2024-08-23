import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  sliderContainer: {
    width: '100%',
    overflow: 'hidden',
  },

  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.5s ease-in-out',
  },

  slide: {
    flex: '0 0 calc(25% - 20px)',
    width: 'calc(25% - 20px)',
  },

  button: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.general,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.3,
    },
  },

  icon: {
    path: {
      stroke: theme.palette.primary.main,
    },
  },
}))
