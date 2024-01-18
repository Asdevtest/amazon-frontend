import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    flexWrap: 'nowrap',
  },
  tooltipsWrapper: {
    display: 'flex',
    alignItems: 'end',
    marginLeft: 3,
    zIndex: '10',
  },

  noFlextextWrapper: {
    position: 'relative',
    marginRight: '15px',
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

  cornerTooltipsWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-15px',
    zIndex: '10',

    display: 'flex',
  },

  baseLineTooltipsWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translateX(100%)',
    zIndex: '10',
  },
}))
