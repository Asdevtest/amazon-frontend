import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  customSwitcherContainer: {
    width: '30%',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  datagridWrapper: {
    height: 'calc(100vh - 200px)',
    width: '100%',
  },
}))
