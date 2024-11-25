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

  infoWrapper: {
    maxWidth: '1000px',
    overflow: 'hidden',
  },

  shopContainer: {
    display: 'flex',
    gap: 5,
  },

  text: {
    fontSize: 14,
    maxWidth: '1000px',
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  textSecond: {
    color: theme.palette.text.second,
    minWidth: '40px',
  },

  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
    flexShrink: 1,
    minWidth: 0,
  },

  title: {
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
  },
}))
