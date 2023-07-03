import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  tooltipsWrapper: {
    position: 'absolute',
    top: '1px',
    right: '1px',
    zIndex: '10',
    display: 'flex',
  },

  tooltip: {
    width: '17px',
    height: '17px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },

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

  selected: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
  },
}))
