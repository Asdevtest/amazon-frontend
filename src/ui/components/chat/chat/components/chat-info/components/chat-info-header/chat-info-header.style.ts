import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatHeader: {
    padding: '10px',
    gap: '10px',
    height: 178,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.general,
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,

    [theme.breakpoints.down(768)]: {
      height: 143,
    },
  },

  chatAvatarWrapper: {
    aspectRatio: '1 / 1',
    height: '100%',
  },

  chatAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  favoritesIcon: {
    color: theme.palette.primary.main,
    width: '100px !important',
    height: '100px !important',
  },

  chatTitle: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },

  chatSubTitle: {
    color: theme.palette.text.second,
    fontSize: 12,
  },

  chatHeaderContent: {
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    gap: '10px',
  },

  chatInfoTitle: {
    fontSize: 18,
    fontWeight: 600,
  },

  chatInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    overflow: 'hidden',
  },

  chatTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  chatInfoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
