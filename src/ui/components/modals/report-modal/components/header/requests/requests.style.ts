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
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  requestTextSecond: {
    color: theme.palette.text.secondary,
  },

  link: {
    color: theme.palette.primary.main,
  },

  requestTypeTooltip: {
    minWidth: 60,
    maxWidth: 115,
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  crossButton: {
    width: '16px !important',
    height: '16px !important',
    minWidth: '16px !important',

    span: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  crossIcon: {
    width: '8px !important',
    height: '8px !important',
  },
}))
