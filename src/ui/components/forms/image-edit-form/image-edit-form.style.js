import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    // width: 500,
    // maxHeight: 510,
    display: 'flex',
    flexDirection: 'column',
  },

  imageWrapper: {
    // width: '50vw',
    height: '55vh',
    paddingTop: 130,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  image: {
    width: '33vw',
    height: '33vh',
    objectFit: 'contain',
    // objectPosition: 'center',
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
