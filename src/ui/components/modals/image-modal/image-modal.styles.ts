import { makeStyles } from 'tss-react/mui'

export const useImageModalStyles = makeStyles()(theme => ({
  modalContainer: {
    maxHeight: '70vh',
    padding: 40,
    // overflow: 'unset',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 42,
  },

  imagesList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    paddingRight: 20,
    gap: 25,
  },

  imagesListItem: {
    display: 'flex',
    gap: 10,
    padding: '10px',
    border: `1px solid #424250`,
    borderRadius: '4px',
    cursor: 'pointer',
    maxWidth: 193,
    width: 'fit-content',

    img: {
      width: '75px',
      height: '75px',
      borderRadius: '4px',
    },

    p: {
      overflowWrap: 'anywhere',
    },
  },

  imagesListItemActive: {
    border: `1px solid #4CA1DE`,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },

  title: {},

  slider: {
    maxWidth: 720,
    width: '100vh',
    height: '100%',
  },

  sliderItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',

    img: {
      objectFit: 'contain',
      width: '100%',
      height: 'auto',
      maxHeight: '45vh',
    },
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },

  comment: {},

  currentSlide: {
    fontSize: '14px',
  },

  controls: {
    // marginTop: 'auto',
    // display: 'grid',
    // gridTemplateColumns: '1fr 1fr',
    // gridAutoRows: '40px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: '-70px',
    width: '100%',
    marginRight: '-304px',
    gap: 30,

    button: {
      width: 40,
      height: 40,
    },
  },

  placeholder: {
    width: '110px',
  },

  controlBtn: {},

  zoomModal: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  zoomModalImage: {
    width: '95vw',
    height: '93vh',
    objectFit: 'contain',
  },
}))
