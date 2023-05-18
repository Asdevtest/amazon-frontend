import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imgBox: {
    objectFit: 'contain',
    width: '50vw',
    maxHeight: '70vh',
  },
  carouselWrapper: {
    textAlign: 'center',
    height: '100%',
    width: '55vw',
  },

  body: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 140px 70px',
  },

  mainWrapper: {
    position: 'relative',
    overflow: 'visible',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
  },

  previewListWrapper: {
    height: '92%',
    position: 'absolute',
    bottom: 20,
    left: 30,
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
    display: 'flex',
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
