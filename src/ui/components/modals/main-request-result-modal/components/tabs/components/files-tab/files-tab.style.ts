import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  files: {
    position: 'relative',
    padding: 5,
    height: 290,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    overflow: 'auto',
  },
}))
