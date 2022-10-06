import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  imgBox: {
    objectFit: 'contain',
    width: '50vw',
    height: '70vh',
  },
  closeIcon: {
    color: 'white',
  },
  closeWrapper: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    border: '2px solid white',
    position: 'absolute',
    top: '0',
    right: '0',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    zIndex: '333',
    transition: '0.3s ease',
    opacity: '.3',
    '&:hover': {
      opacity: '1',
    },
  },
  mainWrapper: {
    position: 'relative',
    overflow: 'visible',
  },
}))
