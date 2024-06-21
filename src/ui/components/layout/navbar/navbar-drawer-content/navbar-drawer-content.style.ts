import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    overflowX: 'hidden',

    [theme.breakpoints.down(1024)]: {
      height: '100%',
    },
  },

  categoriesWrapper: {
    padding: 0,
  },

  bottomCategories: {
    marginBottom: '5px',
    fontSize: 14,
    lineHeight: '19px',
  },

  feedBackButton: {
    width: '100%',
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    cursor: 'pointer',
    color: theme.palette.text.general,

    '&:hover': {
      backgroundColor: 'rgba(0,123,255,0.3)',
      opacity: 0.7,
    },
  },

  shortFeedBackButton: {
    padding: '0 10px',
    justifyContent: 'flex-start',
  },

  feedbackIcon: {
    width: '40px !important',
    height: '40px !important',
  },

  appVersion: {
    marginLeft: 15,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  smallAppVersion: {
    fontSize: 12,
    lineHeight: '16px',
    marginLeft: 8,
  },
}))
