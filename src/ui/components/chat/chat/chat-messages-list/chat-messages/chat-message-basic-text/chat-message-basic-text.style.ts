import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    padding: '14px 10px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: 690,

    backgroundColor: '#CCE2FF',
    borderRadius: 20,
  },
  rootIsIncomming: {
    backgroundColor: '#EBEBEB',
  },

  timeText: {
    fontSize: '14px',
    minWidth: 40,
  },

  messageText: {
    marginRight: '30px !important',

    whiteSpace: 'pre-wrap',
    fontSize: 18,
    lineHeight: '140%',
    color: '#001029',

    width: '100%',
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
  '@media (max-width: 768px)': {
    filesMainWrapper: {
      // width: '120px',
    },
    messageText: {
      marginRight: '30px !important',

      whiteSpace: 'pre-wrap',
      fontSize: 14,
      lineHeight: '19px',
      color: '#001029',

      width: '100%',
    },
  },
}))
