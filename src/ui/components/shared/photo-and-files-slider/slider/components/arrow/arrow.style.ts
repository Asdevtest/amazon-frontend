import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  arrowIcon: {
    width: '30px !important',
    height: '30px !important',
    color: theme.palette.primary.main,
    cursor: 'pointer',
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
