import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
  },

  datagridWrapper: {
    height: 'calc(100vh - 160px)',
    width: '100%',
  },
}))
