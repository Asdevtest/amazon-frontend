import {makeStyles} from '@material-ui/core/styles'

export const useClassNames = makeStyles(() => ({
  tableRow: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  noClickable: {
    cursor: 'default',
  },
}))
