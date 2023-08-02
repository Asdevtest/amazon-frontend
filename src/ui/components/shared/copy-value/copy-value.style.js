import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  copyImg: {
    width: '18px !important',
    height: '18px !important',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
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
