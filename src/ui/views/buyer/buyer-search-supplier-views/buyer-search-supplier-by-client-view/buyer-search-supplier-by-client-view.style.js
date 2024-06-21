import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    marginBottom: 20,
  },

  datagridWrapper: {
    height: 'calc(100vh - 160px)',
    width: '100%',
  },
}))
