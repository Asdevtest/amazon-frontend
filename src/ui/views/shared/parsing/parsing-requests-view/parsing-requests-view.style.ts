import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },

  tableWrapper: {
    marginTop: '20px',
    width: '100%',
    height: '80vh',
  },
}))
