import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxWidth: 690,
    backgroundColor: theme.palette.background.chatMyMessage,
    borderRadius: 20,

    [theme.breakpoints.down(768)]: {
      padding: '10px 10px 5px 10px',
      borderRadius: 15,
      gap: 5,
    },
  },

  isFound: {
    borderLeft: `8px solid #D8B704`,
  },

  isFoundIncomming: {
    borderLeft: 'none',
    borderRight: `8px solid #D8B704`,
  },

  rootIsIncomming: {
    backgroundColor: `${theme.palette.background.chatIncomeMessage} !important`,
  },

  highlightClassName: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgb(201, 229, 114)',
  },

  highlightText: {
    whiteSpace: 'pre-wrap',
    fontSize: 18,
    lineHeight: '140%',
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
      maxWidth: 240,
    },
  },

  subWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  messageText: {
    wordWrap: 'break-word',
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
    width: '100%',

    [theme.breakpoints.down(768)]: {
      minWidth: 80,
      fontSize: 12,
      maxWidth: 210,
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
    color: theme.palette.text.second,

    [theme.breakpoints.down(768)]: {
      fontSize: 12,
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
