import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  lastCrumb: {
    color: '#001029;',
    fontSize: 18,
  },

  сrumb: {
    color: '#007bff',
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '@media (max-width: 768px)': {
    сrumb: {
      fontSize: '14px !important',
    },
    lastCrumb: {
      fontSize: '14px !important',
    },
  },
})
