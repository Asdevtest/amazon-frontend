import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  label: {
    textTransform: 'capitalize',
  },

  flag: {
    width: '24px',
    height: '24px',
  },
}))
