import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },

  downloadLink: {
    fontSize: 14,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImgButton: {
    minWidth: 'unset !important',
    backgroundColor: 'inherit',
    padding: 0,
    margin: 0,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  viewBtn: {
    height: 30,
  },
}))
