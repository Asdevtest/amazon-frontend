import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}))
