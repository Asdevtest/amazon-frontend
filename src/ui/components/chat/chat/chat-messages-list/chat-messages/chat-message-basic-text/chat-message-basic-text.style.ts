import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '10px 10px 5px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxWidth: 490,
    backgroundColor: theme.palette.background.chatMyMessage,
    borderRadius: 15,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 320,
    },

    [theme.breakpoints.down(1024)]: {
      maxWidth: 390,
    },

    [theme.breakpoints.down(768)]: {
      gap: 5,
    },
  },

  rootIsIncomming: {
    backgroundColor: `${theme.palette.background.chatIncomeMessage} !important`,
  },

  isFound: {
    borderLeft: `8px solid #D8B704`,
  },

  isFoundIncomming: {
    borderLeft: 'none',
    borderRight: `8px solid #D8B704`,
  },

  subWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  highlightClassName: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgb(201, 229, 114)',
  },

  highlightText: {
    whiteSpace: 'pre-wrap',
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.primary.main,
  },

  highlight: {
    backgroundColor: '#D8B704',
    color: '#001029 !important',
    borderRadius: 4,
    padding: 3,
  },

  filesMainWrapper: {
    [theme.breakpoints.down(768)]: {
      maxWidth: 220,
    },
  },

  messageText: {
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    wordWrap: 'break-word',
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      minWidth: 80,
      fontSize: 12,
      lineHeight: '16px',
      maxWidth: 220,
    },
  },

  infoContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      gap: 5,
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

  icon: {
    height: '24px !important',

    [theme.breakpoints.down(768)]: {
      height: '18px !important',
    },
  },

  isReadIcon: {
    color: '#00B746',
  },

  noReadIcon: {
    color: theme.palette.text.second,
  },
}))
