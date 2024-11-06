import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatItemWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '68px',
    width: '100%',
  },

  favoritesIcon: {
    width: '38px !important',
    height: '38px !important',
    color: theme.palette.primary.main,
  },

  avatar: {
    width: '38px !important',
    minWidth: '38px !important',
    minHeight: '38px !important',
    height: '38px !important',
  },

  chatItemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    p: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },

  chatItemTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },
}))
