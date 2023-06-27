import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imgBox: {
    objectFit: 'contain',
    width: '100%',
    // maxHeight: '70vh',
    height: '100%',
  },
  carouselWrapper: {
    textAlign: 'center',
    height: '100%',
    maxWidth: 720,
    width: '100vh',
  },

  body: {
    display: 'flex',
    justifyContent: 'center',
    // padding: '20px',
    gap: '20px',
    height: '100%',
    minHeight: '70vh',
  },

  mainWrapper: {
    // position: 'relative',
    overflow: 'visible',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '60px',
    gap: '20px',
  },

  previewListWrapper: {
    height: '92%',
    // position: 'absolute',
    overflowX: 'auto',
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
    // width: '75px',
    height: '75px',
    display: 'flex',
    gap: '10px',
    width: 'max-content',
    cursor: 'pointer',
  },

  previewListImage: {
    width: '75px',
    height: '75px',
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
    // position: 'absolute',
    alignItems: 'flex-end',
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

  imageComment: {
    fontSize: 18,
    color: theme.palette.text.second,
    wordBreak: 'break-all',
  },

  imageLeftSideComment: {
    fontSize: 14,
    color: theme.palette.text.second,
    wordBreak: 'break-word',
  },
}))
