import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  wrapperRow: {
    flexDirection: 'row',
  },

  button: {
    width: '100%',
    height: 30,
  },
}))
