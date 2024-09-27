import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
    },
  },

  searchInput: {
    width: 305,

    [theme.breakpoints.down(1024)]: {
      width: 220,
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchInputShort: {
    [theme.breakpoints.down(1024)]: {
      width: 102,
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchResult: {
    width: 140,
    color: theme.palette.text.second,

    [theme.breakpoints.down(1024)]: {
      fontSize: 12,
    },
  },
}))
