import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    border: '1px solid #4CAF50',
    backgroundColor: theme.palette.background.general,
    borderRadius: 7,

    [theme.breakpoints.down(768)]: {
      padding: '20px 16px',
    },
  },

  headerAndTimeWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  headerText: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
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

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  descriptionText: {
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
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

  resultWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 50,

    [theme.breakpoints.down(1350)]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
    },
  },

  resultWrapperShowChatInfo: {
    [theme.breakpoints.down(1550)]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
    },
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(1350)]: {
      alignItems: 'flex-start',
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  infoWrapperShowChatInfo: {
    [theme.breakpoints.down(1550)]: {
      alignItems: 'flex-start',
    },
  },

  fieldLabel: {
    marginBottom: 5,
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

  fieldContainer: {
    width: 'max-content',
    marginBottom: 0,
  },

  infoItem: {
    height: 40,
    maxWidth: 'max-content',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
    background: theme.palette.background.green,
    borderRadius: 7,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      flexWrap: 'wrap',
    },
  },

  btnsWrapperShowChatInfo: {
    [theme.breakpoints.down(1350)]: {
      flexWrap: 'wrap',
    },
  },

  button: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  buttonShowChatInfo: {
    [theme.breakpoints.down(1350)]: {
      width: '100%',
    },
  },

  actionButton: {
    width: '100%',
    padding: '0 15px',
  },

  editButton: {},

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
}))
