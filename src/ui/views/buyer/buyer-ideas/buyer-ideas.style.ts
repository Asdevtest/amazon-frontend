import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,

      width: 5,
      height: '98%',
    },
  },

  yellowBorder: {
    background: theme.palette.background.yellowRow,

    '&:hover': {
      background: theme.palette.background.yellowRow,
    },

    '&:after': {
      background: '#C69109',
    },
  },

  redBorder: {
    background: theme.palette.background.redRow,

    '&:hover': {
      background: theme.palette.background.redRow,
    },

    '&:after': {
      background: theme.palette.other.rejected,
    },
  },
}))
