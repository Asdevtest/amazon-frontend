import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
  },

  leftPreviews: {
    flexDirection: 'row-reverse',
  },
}))
