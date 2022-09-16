import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  root: {},
  title: {
    color: '#007bff',
    fontSize: '18px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },

  selectedBtn: {
    // backgroundСolor: 'rgba(25, 118, 210, 0.8)',
    backgroundColor: 'red',
  },

  // button: {
  //   '&.Mui-selected, &.Mui-selected:hover': {
  //     color: 'white',
  //     backgroundColor: '#006CFF',
  //   },
  // },

  // buttonsWrapper: {
  //   width: '200px',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   gap: '20px',
  // },
})
