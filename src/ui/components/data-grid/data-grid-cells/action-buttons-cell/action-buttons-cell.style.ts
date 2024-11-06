import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  block: {
    width: '100%',
  },

  wrapperRow: {
    flexDirection: 'row',
  },
}))
