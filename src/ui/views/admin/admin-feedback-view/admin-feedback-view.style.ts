import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  tableWrapper: {
    height: '82vh',
    width: '100%',
    marginTop: 20,
  },
}))
