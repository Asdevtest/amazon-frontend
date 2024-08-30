import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    gap: '20px',
  },

  tableWrapper: {
    marginTop: '20px',
    height: '82vh',
    width: '100%',
  },
}))
