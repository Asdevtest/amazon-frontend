import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  image: {
    width: '95vw',
    height: '93vh',
    objectFit: 'contain',
  },
}))
