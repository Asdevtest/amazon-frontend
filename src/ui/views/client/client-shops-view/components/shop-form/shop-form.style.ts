import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: '600',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  field: {
    margin: 0,
  },

  buttons: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))
