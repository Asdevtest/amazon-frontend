import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  tableWrapper: {
    marginTop: 20,
    height: '82vh',
    width: '100%',
  },
}))
