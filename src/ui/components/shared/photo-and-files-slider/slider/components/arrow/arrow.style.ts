import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  arrowIcon: {
    width: '30px !important',
    height: '30px !important',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 20,
  },

  leftArrow: {
    left: '0',
    [theme.breakpoints.down(520)]: {
      left: '-30px',
    },
  },
  rightArrow: {
    right: '0',
    [theme.breakpoints.down(520)]: {
      right: '-30px',
    },
  },

  arrowIconDisable: {
    color: '#C4C4C4',
    cursor: 'auto',
  },

  smallArrow: {
    width: '30px !important',
    height: '30px !important',
  },

  mediumArrow: {
    width: '35px !important',
    height: '35px !important',
  },

  bigArrow: {
    width: '40px !important',
    height: '40px !important',
  },
}))
