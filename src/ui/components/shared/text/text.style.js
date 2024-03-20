import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    margin: 0,
    flexWrap: 'nowrap',
  },

  tooltipsWrapper: {
    display: 'flex',
    gap: 3,
    zIndex: 10,
  },

  noFlextextWrapper: {
    position: 'relative',
    marginRight: '15px',
  },

  tooltip: {
    width: '16px !important',
    height: '16px !important',
    transition: '.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    color: theme.palette.primary.main,
  },

  cornerTooltipsWrapper: {
    position: 'absolute',
    top: -10,
    right: -15,
    zIndex: 10,

    display: 'flex',
  },

  baseLineTooltipsWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translateX(100%)',
    zIndex: 10,
  },
}))
