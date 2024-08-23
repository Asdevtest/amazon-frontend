import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: '20px',
  },

  tableWrapper: {
    height: 'calc(100% - 70px)',
    width: '100%',
  },

  buttonsContainer: {
    display: 'flex',
    gap: '20px',
  },
}))
