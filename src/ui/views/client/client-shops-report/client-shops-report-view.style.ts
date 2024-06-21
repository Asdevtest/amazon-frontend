import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: '10px',
  },

  tabledWrapper: {
    height: 'calc(100vh - 240px)',
    width: '100%',
  },
}))
