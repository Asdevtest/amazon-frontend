import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '14px 10px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: 690,

    backgroundColor: theme.palette.background.chatMyMessage,
    borderRadius: 20,
  },
  rootIsIncomming: {
    backgroundColor: `${theme.palette.background.chatIncomeMessage} !important`,
  },

  timeText: {
    fontSize: '14px',
    minWidth: 40,

    color: theme.palette.text.second,
  },

  messageText: {
    marginRight: '30px !important',

    whiteSpace: 'pre-wrap',
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,

    width: '100%',
    [theme.breakpoints.down(768)]: {
      marginRight: '30px !important',

      whiteSpace: 'pre-wrap',
      fontSize: 14,
      lineHeight: '19px',

      width: '100%',
    },
  },

  filesMainWrapper: {
    padding: '14px 10px',
    borderRadius: '4px',
  },

  subWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  readIconsWrapper: {
    width: 35,
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
}))
