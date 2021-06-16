import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  table: {
    whiteSpace: 'nowrap',
    '& td': {
      flexShrink: 0,
      color: 'rgba(61, 81, 112, 1)',
    },
    '& th': {
      color: 'rgba(61, 81, 112, 1)',
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
    },
  },
  centerTextCell: {
    textAlign: 'center',
  },
  rightTextCell: {
    textAlign: 'right',
  },
  mainTitle: {
    marginTop: '30px',
  },
  replenishRow: {
    '& td': {
      color: theme.palette.success.main,
      textAlign: 'center',
    },

    '& $amountCell': {
      textAlign: 'right',
    },
  },
  withdrawRow: {
    '& td': {
      color: theme.palette.error.main,
      textAlign: 'center',
    },

    '& $amountCell': {
      textAlign: 'right',
    },
  },
  amountCell: {},
}))
