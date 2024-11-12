import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  secondsTimeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    p: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
}))
