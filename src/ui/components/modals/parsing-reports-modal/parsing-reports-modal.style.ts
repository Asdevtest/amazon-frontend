import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tableStyles: {
    width: 'unset',
    height: 'unset',
    flex: 1,
    overflow: 'hidden',
  },

  root: {
    height: '80vh',
    width: '85vw',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
}))
