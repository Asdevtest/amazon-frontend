import {makeStyles} from '@material-ui/core/styles'

export const useClassNames = makeStyles(() => ({
  tableRow: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  noClickable: {
    cursor: 'default',
  },
}))
