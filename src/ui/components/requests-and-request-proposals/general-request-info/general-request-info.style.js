import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    padding: '10px 10px 0',
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
    width: '50%',
    padding: '5px',
  },

  rightColumn: {
    width: '50%',
    padding: '5px',
    borderLeft: '1px solid rgba(0,0,0,.3)',
  },

  rightHeadColumn: {
    width: '50%',
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
}))
