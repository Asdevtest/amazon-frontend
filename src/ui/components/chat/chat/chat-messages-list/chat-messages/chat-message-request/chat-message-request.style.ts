import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      padding: 20,
    },
  },

  headerAndTimeWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  timeText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  mainInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  mainInfoWrapperShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  descriptionWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  description: {
    fontSize: 18,
    lineHeight: '25px',

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  footerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      flexWrap: 'wrap',
      gap: 10,
    },
  },

  footerWrapperShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      flexWrap: 'wrap',
      gap: 10,
    },
  },

  labelValueBlock: {
    width: '100%',

    [theme.breakpoints.down(768)]: {
      flexWrap: 'wrap',
      gap: 5,
    },
  },

  /* conditionsField: {
    border: 'none',
    resize: 'none',
    color: theme.palette.text.second,
    fontSize: 18,
    fontFamily: 'inherit',
    width: '305px',
    outline: 'none',
    backgroundColor: 'inherit',
  }, */
}))
