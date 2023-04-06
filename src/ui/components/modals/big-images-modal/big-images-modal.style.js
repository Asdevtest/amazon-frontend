import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  imgBox: {
    objectFit: 'contain',
    width: '50vw',
    maxHeight: '70vh',
  },
  carouselWrapper: {
    textAlign: 'center',
    width: '55vw',
  },

  body: {
    display: 'flex',
    justifyContent: 'space-between',
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
    // width: '50vw',
    // height: '70vh',
  },

  previewList: {
    overflowY: 'auto',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  previewListItem: {
    maxWidth: '75px',
  },

  previewListImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid #E0E0E0',
  },

  activeImage: {
    borderColor: '#5BA0FE !important',
  },

  controls: {
    display: 'flex',
    alignItems: 'flex-end',
  },
}))
