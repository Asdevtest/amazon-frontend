import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    backgroundColor: '#FCFCFC',
    padding: '14px 10px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: 690,
  },
  rootIsIncomming: {
    // justifyContent: 'flex-start',
  },

  timeText: {
    fontSize: '14px',
    minWidth: 40,
  },

  messageText: {
    marginRight: 30,
  },
}))
