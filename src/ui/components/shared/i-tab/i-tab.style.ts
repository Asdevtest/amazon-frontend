import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  tabWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'visible',
  },

  root: {
    width: '100%',
    textTransform: 'none',
    color: theme.palette.text.general,
  },

  icon: {
    color: theme.palette.primary.main,
    transform: 'scale(.7)',
  },

  tooltipsWrapper: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 10,
    display: 'flex',
  },

  tooltip: {
    width: 17,
    height: 17,
    color: 'red',
    transition: '.3s ease-in-out',

    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    color: theme.palette.primary.main,
  },
}))
