import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
  },

  tabledWrapper: {
    marginTop: 20,
    height: '80vh',
    width: '100%',
  },
}))
