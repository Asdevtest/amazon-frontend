import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestDetailsWrapper: {
    display: 'flex',
    gap: 5,
  },

  title: {
    lineHeight: '25px',
    color: theme.palette.text.second,
    fontSize: 16,
  },

  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.palette.text.general,
    fontWeight: 600,
  },
}))
