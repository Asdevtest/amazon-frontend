import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  tableWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    padding: '3px',
  },
}))
