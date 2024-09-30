import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sider: {
    background: theme.palette.background.general,

    '.ant-layout-sider-children': {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',

      '& > div:nth-of-type(2)': {
        height: '100%',
        overflowY: 'auto',
      },
    },
  },

  version: {
    paddingLeft: 16,
  },

  feedback: {
    fontSize: '14px',
  },
}))
