import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  leftPanel: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 40,
    color: theme.palette.text.second,
  },

  logo: {
    width: '250px !important',
    height: '84px !important',
    color: theme.palette.text.general,

    'path:first-of-type': {
      fill: theme.palette.primary.main,
    },
  },

  main: {
    marginBottom: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontWeight: 600,
    textAlign: 'center',
  },

  title: {
    fontSize: 40,
    lineHeight: '48px',
  },

  subtitle: {
    fontSize: 24,
    lineHeight: '32px',
  },
}))
