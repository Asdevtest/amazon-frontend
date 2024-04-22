import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  fileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  file: {
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    cursor: 'pointer',
  },
}))
