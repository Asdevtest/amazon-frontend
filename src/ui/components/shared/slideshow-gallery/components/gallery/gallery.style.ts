import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: 10,
  },

  leftPreviews: {
    flexDirection: 'row-reverse',
  },
}))
