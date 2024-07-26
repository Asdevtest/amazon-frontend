import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tableWrapper: {
    width: '100%',
    height: '80vh',
    marginTop: '20px',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
