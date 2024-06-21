import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  ideaSupplier: {
    p: {
      fontSize: 14,
    },
  },

  buttonWithIcon: {
    height: 30,
    display: 'flex',
    gap: 5,

    svg: {
      width: 12,
    },
  },
}))
