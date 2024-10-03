import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatInfoHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    fontWeight: 600,
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: 1,
  },
}))
