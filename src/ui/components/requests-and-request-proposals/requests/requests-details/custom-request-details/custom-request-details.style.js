import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '0 10px 10px',
  },

  requestDataWrapper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
  },

  row: {
    display: 'flex',
    '&:nth-child(2n)': {
      background: 'rgba(0,0,0,.1)',
    },
  },

  leftColumn: {
    width: '70%',
    padding: '5px',
  },

  rightColumn: {
    width: '30%',
    padding: '5px',
    borderLeft: '1px solid rgba(0,0,0,.3)',
  },

  rightHeadColumn: {
    width: '30%',
    padding: '5px',
  },

  columnHead: {
    fontWeight: 'bold',
  },

  clientComment: {
    minHeight: '100px',
    maxHeight: '300px',
    overflowY: 'scroll',
  },

  defaultBlock: {
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    marginBottom: '20px',
  },

  conditionsField: {
    width: '100%',
    minHeight: '20vh',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  nameField: {
    width: '100%',
  },
}))
