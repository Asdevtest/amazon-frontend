import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    background: theme.palette.background.authView,
  },

  rightPanel: {
    position: 'relative',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formWrapper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: '500',
    color: theme.palette.primary.main,
  },

  versionContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },

  versionButton: {
    color: theme.palette.primary.main,
  },

  themeSelector: {
    padding: 4,
    color: theme.palette.primary.main,
  },
}))
