import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imgBox: {
    objectFit: 'contain',
    width: '50vw',
    // maxWidth: "565px",
    maxHeight: '70vh',
  },
  carouselWrapper: {
    textAlign: 'center',
    height: '100%',
    width: '55vw',
  },

  body: {
    display: 'flex',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    padding: '20px 140px 70px',
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
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
  },

  previewListWrapper: {
    height: '90%',

    position: 'absolute',
    bottom: 20,
    left: 30,
    // paddingBottom: '10px',
    marginLeft: 20,

    overflowY: 'auto',
    display: 'flex',
  },

  previewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    paddingBottom: '10px',
    marginTop: 'auto',
  },

  previewListItem: {
    width: '75px',
    height: '75px',
  },

  previewListImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '3px solid #E0E0E0',
  },

  activeImage: {
    borderColor: '#5BA0FE !important',
  },

  controls: {
    // display: 'flex',
    // alignItems: 'flex-end',

    display: 'flex',
    // flexDirection: 'column',
    gap: 20,
    position: 'absolute',
    bottom: 30,
    right: 30,
    marginRight: 20,
  },

  indicator: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    color: theme.palette.primary.main,
    fontSize: 18,
    transform: 'translate(-50%,0)',
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  zoomDialogContext: {
    padding: 0,
  },
}))
