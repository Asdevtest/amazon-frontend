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
    border: `1px solid ${theme.palette.primary.main}`,
    width: 305,
    height: 40,

    [theme.breakpoints.down(1024)]: {
      width: 220,
      flex: '1 1 auto',

      '& > input': {
        padding: 9,
      },
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
