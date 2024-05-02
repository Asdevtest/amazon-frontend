import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  datagridWrapper: {
    height: '76vh',
    width: '100%',
  },
}))
