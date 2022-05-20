import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  root: {},
  title: {
    color: '#007bff',
    fontSize: '18px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: '.8',
    },
  },

  selectedBtn: {
    // backgroundСolor: 'rgba(25, 118, 210, 0.8)',
    backgroundColor: 'red',
  },
})
