import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
  },

  noActiveSessions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeSessions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },

  title: {
    fontSize: 25,
    lineHeight: 1.4,
    fontWeight: 600,
  },
}))
