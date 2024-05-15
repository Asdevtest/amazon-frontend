import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  leftPanel: {
    width: '45%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 30,
    background: theme.palette.background.entryLeftPanel,
    color: theme.palette.text.second,
  },

  logo: {
    width: '283px !important',
    height: '150px !important',
    color: theme.palette.text.general,

    'path:first-of-type': {
      fill: theme.palette.primary.main,
    },
  },

  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: '110%',
  },

  subtitle: {
    fontSize: '24px',
    fontWeight: 600,
  },

  footer: {
    height: '20%',
  },
}))
