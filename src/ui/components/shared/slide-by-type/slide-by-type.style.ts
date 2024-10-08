import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  objectFitContain: {
    objectFit: 'contain',
  },
}))
