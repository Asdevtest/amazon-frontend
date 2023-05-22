import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  copyImg: {
    width: '18px !important',
    height: '18px !important',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    color: theme.palette.primary.main,
  },

  doneIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.text.green,
  },

  copyImgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
