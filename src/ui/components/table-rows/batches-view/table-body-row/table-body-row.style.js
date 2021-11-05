import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles({
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
  },

  selected: {
    backgroundColor: 'rgba(0,123,255,0.3)',
  },
})
