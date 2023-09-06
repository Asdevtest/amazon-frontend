import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
    color: theme.palette.text.general,

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
    lineHeight: '16px',
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

  mainWrapper: {
    display: 'flex',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  mainWrapperShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  leftSideWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  description: {
    fontSize: 18,
    lineHeight: '25px',
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
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

  leftSide: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(1450)]: {
      flexWrap: 'wrap',
    },
  },

  leftSideShowChatInfo: {
    [theme.breakpoints.down(1750)]: {
      flexWrap: 'wrap',
    },
  },

  labelValueBlock: {
    width: '100%',
    maxWidth: 300,

    [theme.breakpoints.down(768)]: {
      flexWrap: 'wrap',
      gap: 5,
    },
  },

  labelValueBlockShowChatInfo: {
    [theme.breakpoints.down(1350)]: {
      flexWrap: 'wrap',
      gap: 5,
    },
  },

  rightSideWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      width: '100%',
    },
  },

  rightSideWrapperShowChatInfo: {
    [theme.breakpoints.down(1750)]: {
      width: '100%',
    },
  },

  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  actionButton: {
    padding: '0 15px',

    [theme.breakpoints.down(480)]: {
      padding: '0 10px',
    },
  },

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  cancelBtn: {
    backgroundColor: '#F44336',
    color: '#fff',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },
}))
