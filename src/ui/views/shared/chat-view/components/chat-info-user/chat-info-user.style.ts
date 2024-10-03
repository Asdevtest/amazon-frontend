import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatInfoHeaderWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  text: {
    flex: '0 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  title: {
    fontWeight: 600,
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: 1.3,
  },
}))
