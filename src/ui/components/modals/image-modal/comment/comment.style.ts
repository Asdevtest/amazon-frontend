import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    maxWidth: 700,
    fontSize: '14px',
    lineHeight: '19px',
    wordBreak: 'break-all',
  },

  titleError: {
    color: theme.palette.text.red,
  },
}))
