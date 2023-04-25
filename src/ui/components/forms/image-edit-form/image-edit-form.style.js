import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    // width: 500,
    // maxHeight: 510,
    display: 'flex',
    flexDirection: 'column',
  },

  // imageWrapper: {
  //   width: '50vw',
  //   height: '50vh',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  image: {
    width: '35vw',
    height: '35vh',
    objectFit: 'contain',
    objectPosition: 'center',
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
