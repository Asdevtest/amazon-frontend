import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  requestWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  requestConatainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  requestText: {
    fontSize: 14,
    lineHeight: '19px',
  },

  requestTextSecond: {
    color: theme.palette.text.secondary,
  },

  crossButton: {
    width: '16px !important',
    height: '16px !important',
    minWidth: '16px !important',
  },

  crossIcon: {
    width: '8px !important',
    height: '8px !important',
  },
}))
