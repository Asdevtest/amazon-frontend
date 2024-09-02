import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  minimazed: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: '20px',
  },
}))
