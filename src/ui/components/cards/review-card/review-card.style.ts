import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderBottom: '1px solid #e0e0e0',
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20,
  },

  userLinkContainer: {
    width: 200,
  },

  headerItem: {
    display: 'flex',
    flexDirection: 'column',

    '&:last-of-type': {
      display: 'flex',
      marginLeft: 'auto',
      alignItems: 'flex-end',
    },
  },

  headerItemTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  headerItemTitleBold: {
    fontWeight: 600,
  },

  rating: {
    fontSize: 16,
  },

  editor: {
    minHeight: 'auto',
  },
}))
