import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  boxDimentionsWrapper: {
    display: 'flex',
    gap: '15px',
  },

  dimentionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },

  uploadFiles: {
    width: 'unset',
    flex: 1,
  },
}))
