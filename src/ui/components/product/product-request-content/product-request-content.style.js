import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '10px',
  },

  requestDataWrapper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,.3)',
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

  columnHead: {
    fontWeight: 'bold',
  },

  clientComment: {
    minHeight: '100px',
    maxHeight: '300px',
    overflowY: 'scroll',
  },
}))
