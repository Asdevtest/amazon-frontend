import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sider: {
    transition: 'all .5s ease',
    background: theme.palette.background.general,
  },

  version: {
    paddingLeft: 16,
  },

  feedback: {
    fontSize: '14px',
  },
}))
