import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 20,
  },

  infoContainer: {},

  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}))
