import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    height: 280,
    padding: 2,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 'content',
  },

  orderInfoWrapper: {
    height: 346,
    padding: 0,
  },
}))
