import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    maxWidth: 550,
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 700,
    color: theme.palette.text.general,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
