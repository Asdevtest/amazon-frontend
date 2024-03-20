import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },

  headerAndTimeWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 100,
  },

  titleText: {
    width: '100%',
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
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(768)]: {
      fontSize: 12,
      lineHeight: '16px',
    },
  },

  reasonText: {
    fontSize: 18,
    lineHeight: '25px',
    wordBreak: 'break-all',
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

  statusTextDesciption: {
    display: 'flex',
    alignItems: 'end',
    gap: 10,
    color: 'grey',
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

  statusText: {
    color: theme.palette.text.general,
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

  detailsWrapper: {
    width: '100%',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    backgroundColor: theme.palette.background.general,
    borderRadius: 4,

    [theme.breakpoints.down(768)]: {
      padding: 20,
    },
  },

  footerWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },

  footerWrapperShowChatInfo: {
    [theme.breakpoints.down(1450)]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },

  labelValueBlockWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  actionButton: {
    width: 150,
  },

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  editBtn: {
    backgroundColor: '#F44336',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionBtnWrapperStyle: {
    flex: 1,
    display: 'flex',
  },
}))
