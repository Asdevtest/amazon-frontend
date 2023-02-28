import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  imgBox: {
    objectFit: 'contain',
    // width: '50vw',
    // height: '70vh',
    // objectPosition: 'center',

    // width: 'auto',
    // height: 'auto',

    // display: 'flex',
    // alignItems: 'center',
  },
  carouselWrapper: {
    textAlign: 'center',
    width: '55vw',
    height: '70vh',
  },

  mainWrapper: {
    position: 'relative',
    overflow: 'visible',
    width: '55vw',
    // height: '80vh',

    // width: '50vw',
    // height: '70vh',
  },
}))
