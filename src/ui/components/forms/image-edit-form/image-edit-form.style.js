import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: 500,
    maxHeight: 510,
  },

  image: {
    width: '35vw',
    height: '35vh',
    objectFit: 'contain',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 20,
  },
}))
