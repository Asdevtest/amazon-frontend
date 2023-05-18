import { makeStyles } from 'tss-react/mui'

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

  isFound: {
    // borderLeft: `8px solid ${theme.palette.primary.main}`,
    borderLeft: `8px solid #D8B704`,
  },

  isFoundIncomming: {
    borderLeft: 'none',

    // borderRight: `8px solid ${theme.palette.primary.main}`,
    borderRight: `8px solid #D8B704`,
  },

  rootIsIncomming: {
    backgroundColor: `${theme.palette.background.chatIncomeMessage} !important`,
  },

  highlightClassName: {
    color: theme.palette.primary.main,
    // color: 'red',

    backgroundColor: 'rgb(201, 229, 114)',
  },

  timeText: {
    fontSize: '14px',
    minWidth: 45,
    paddingLeft: '5px',

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
    paddingBottom: '10px',
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
