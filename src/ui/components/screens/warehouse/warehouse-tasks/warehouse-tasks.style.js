import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles({
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
  mainTitle: {
    marginTop: '30px',
    marginBottom: '24px',
    backgroundColor: 'rgba(245, 246, 248, 1)',
  },
})
