import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  leftPanel: {
    display: 'flex',
    flex: '0 0 45%',
    flexDirection: 'column',
    padding: '48px',
    background: theme.palette.background.entryLeftPanel,
    color: theme.palette.text.second,
    [theme.breakpoints.down(768)]: {
      background: theme.palette.background.general,
      flex: '0 0 20%',
      padding: '40px 0',
      width: '100%',
    },
    // color: '#656565',
  },
  header: {
    minHeight: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.down(768)]: {
      minHeight: '20%',
    },
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '50px',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: '110%',
    [theme.breakpoints.down(768)]: {
      fontSize: '18px',
      color: theme.palette.text.general,
      marginTop: '10px',
    },
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: 600,
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      color: theme.palette.text.second,
    },
  },
  footer: {
    minHeight: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  logo: {
    width: '283px',
    height: '150px',
    objectFit: 'contain',
    [theme.breakpoints.down(768)]: {
      width: '148px',
      height: '49px',
    },
  },
}))
