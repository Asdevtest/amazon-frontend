import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  wrapperRow: {
    flexDirection: 'row',
  },
}))
