import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  wrapperRow: {
    flexDirection: 'row',
  },

  fullWidth: {
    width: '100%',
  },
}))
