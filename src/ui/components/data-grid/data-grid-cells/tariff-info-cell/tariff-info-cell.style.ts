import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tariffWrapper: {
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  tariffDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },

  tariffTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}))
