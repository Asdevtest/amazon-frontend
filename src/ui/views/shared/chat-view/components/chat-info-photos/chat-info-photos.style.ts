import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  image: {
    width: 'calc(100% / 3 - 5px)',
    height: '150px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}))
