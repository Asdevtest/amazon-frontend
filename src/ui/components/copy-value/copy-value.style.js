import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  copyImg: {
    width: '18px',
    height: '18px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  doneIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.text.green,
  },

  copyImgWrapper: {
    position: 'relative',
  },
  disabledIcon: {
    userSelect: 'none',
    cursor: 'auto',
    '&:hover': {
      transform: 'none',
    },
  },
}))
