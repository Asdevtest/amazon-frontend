import { makeStyles } from 'tss-react/mui'

export const useImageModalStyles = makeStyles()(theme => ({
  modalContainer: {
    maxHeight: '70vh',
    padding: 40,

    [theme.breakpoints.down(768)]: {
      maxHeight: '100vh',
      padding: 20,
    },
  },

  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 42,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
  },

  imagesList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    paddingRight: 20,
    gap: 25,
    maxHeight: 'calc(70vh - 80px)',

    [theme.breakpoints.down(768)]: {
      maxHeight: '273px',
      overflow: 'auto',
      paddingRight: 0,
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },

  imagesListItem: {
    display: 'flex',
    gap: 10,
    padding: '10px',
    border: `1px solid #424250`,
    borderRadius: '4px',
    cursor: 'pointer',
    maxWidth: 193,
    width: '100%',

    img: {
      width: 74,
      height: 74,
      borderRadius: '4px',
    },

    p: {
      overflowWrap: 'anywhere',
    },

    [theme.breakpoints.down(768)]: {
      width: 'max-content',
      padding: 5,
    },
  },

  imagesListItemTitle: {
    fontWeight: 600,
    fontSize: 14,
    minHeight: 20,
  },

  imagesListItemComment: {
    fontSize: 14,
    color: theme.palette.text.second,
    wordBreak: 'break-word',
  },

  shortText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 100,
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

    [theme.breakpoints.down(768)]: {
      gap: 10,
    },
  },

  title: {},

  slider: {
    maxWidth: 720,
    width: '100vh',
    height: '100%',

    [theme.breakpoints.down(768)]: {
      width: '37vh',
    },
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

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
      padding: '0 17px',
      marginTop: 0,
      marginRight: 0,
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
