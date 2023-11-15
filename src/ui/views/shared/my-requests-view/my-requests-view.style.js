import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: 10,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    height: 40,
    width: '400px',
  },

  datagridWrapper: {
    height: '73vh',
    width: '100%',
    marginTop: 20,
  },

  waitingCheckedBacklighting: {
    background: theme.palette.background.green,
    zIndex: 100,
  },

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
