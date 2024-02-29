import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    width: '100%',
  },

  wrapperRow: {
    flexDirection: 'row',
  },
}))
