import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },

  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 2,
      top: 1,

      width: 5,
      height: 72,
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

  dashboardCardWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 305px)',
    gap: 30,
  },

  dashboardCardWrapperList: {
    gridTemplateColumns: '1fr',
  },

  icon: {
    color: theme.palette.text.main,
  },
}))
