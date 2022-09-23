import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(() => ({
  copyImg: {
    width: '18px',
    height: '18px',
    transition: '0.3s ease',
<<<<<<< HEAD
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
=======
    cursor: 'pointer',
>>>>>>> faf2c90f (3652 3653 3659 3661 3663)
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  doneIcon: {
    width: '18px !important',
    height: '18px !important',
  },

  copyImgWrapper: {
    position: 'relative',
  },
}))
