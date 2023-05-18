import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: 500,
    maxHeight: 510,
  },

  image: {
    width: '95vw',
    height: '93vh',

    // width: '100%',
    // height: '100%',
    objectFit: 'contain',
  },
}))
