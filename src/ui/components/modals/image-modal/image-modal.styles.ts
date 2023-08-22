import { makeStyles } from 'tss-react/mui'

export const useImageModalStyles = makeStyles()(theme => ({
  modalContainer: {
    maxHeight: '74vh',
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
    gap: 40,

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
    gap: 25,
    paddingRight: 20,
    maxHeight: 'calc(74vh - 80px)',

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
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
    padding: '10px',
    border: `1px solid #424250`,
    borderRadius: '4px',
    cursor: 'pointer',
    maxWidth: 150,
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
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    textAlign: 'center',
  },

  imagesListItemComment: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: '16px',
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
    padding: '0 100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      padding: 0,
    },
  },

  title: {
    fontSize: '14px',
    lineHeight: '19px',
  },

  slider: {
    maxWidth: 720,

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
    maxWidth: 620,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },

  currentSlide: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  controls: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: '-60px',
    marginRight: '-200px',
    width: '100%',
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
