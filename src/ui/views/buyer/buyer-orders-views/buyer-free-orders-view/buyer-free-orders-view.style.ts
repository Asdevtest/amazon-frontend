import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
    width: '100%',
  },

  dataGridWrapper: {
    flex: 1,
    overflow: 'auto',
    padding: '3px',
    width: '100%',
  },
}))
