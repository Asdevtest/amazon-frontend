import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  previews: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  previewsModalSize: {
    gap: 10,
  },
}))
