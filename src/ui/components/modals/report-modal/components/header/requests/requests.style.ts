import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requests: {
    maxWidth: 490,
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  requestWrapper: {
    minWidth: 210,
    maxWidth: 235,
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
    maxWidth: 90,
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
