import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
  },

  img: {
    height: 40,
    width: 40,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },
}))
