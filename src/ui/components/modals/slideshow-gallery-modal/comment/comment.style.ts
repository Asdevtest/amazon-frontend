import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  textContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  text: {
    width: 550,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
    wordBreak: 'break-all',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}))
