import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  copyImg: {
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'pointer',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  doneIcon: {
    color: theme.palette.text.green,
  },

  copyImgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledIcon: {
    userSelect: 'none',
    cursor: 'auto',
  },
}))
