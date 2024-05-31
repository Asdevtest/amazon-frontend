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

  shopContainer: {
    display: 'flex',
    gap: 5,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  textSecond: {
    color: theme.palette.text.second,
  },

  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },

  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}))
