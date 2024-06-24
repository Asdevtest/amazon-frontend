import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    width: '12px !important',
    height: '12px !important',
  },
}))
