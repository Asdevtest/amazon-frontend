import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.down(768)]: {
      height: '100%',
    },
  },

  categoriesWrapper: {
    padding: 0,
  },

  bottomCategories: {
    marginBottom: 15,
  },

  feedBackButton: {
    width: '100%',
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(0,123,255,0.3)',
      opacity: 0.7,
    },
  },

  shortFeedBackButton: {
    padding: '0 10px',
    justifyContent: 'flex-start',
  },

  feedBackText: {
    fontSize: 13,
    lineHeight: '140%',
  },

  feedbackIcon: {
    width: '46px !important',
    height: '40px !important',
    color: theme.palette.text.general,
  },

  appVersion: {
    color: theme.palette.primary.main,
    marginLeft: 15,
    display: 'inline-block',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  smallAppVersion: {
    fontSize: 12,
    lineHeight: '16px',
    marginLeft: 8,
  },
}))
