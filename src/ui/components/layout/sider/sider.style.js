import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sider: {
    background: theme.palette.background.general,
  },

  version: {
    paddingLeft: 16,
  },

  feedback: {
    fontSize: '14px',
  },
}))
