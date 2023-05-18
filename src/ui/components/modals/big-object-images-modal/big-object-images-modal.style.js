import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imageModalWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'flex-start',
  },

  carouselWrapper: {
    width: 720,
    height: 'fit-content',
    marginTop: 'auto',
  },

  imageModalImageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'fit-content !important',
    marginBottom: '20px',
    gap: 10,
  },

  leftImagesWrapper: {
    height: 565,
    overflowY: 'auto',
    minWidth: 220,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '58px',
  },

  leftImagesSubWrapper: {
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  imageModalSubWrapper: {
    height: 630,
    overflowY: 'auto',
    minWidth: 220,
  },

  imageModalSubWrapperRightSide: {
    display: 'flex',
    marginTop: '580px',
    marginLeft: 20,
    gap: 20,
  },

  imageModalImageWrapperLeftSide: {
    padding: 5,
    display: 'flex',
    width: 200,
    height: 'auto',
    gap: 10,
    cursor: 'pointer',
    transition: '.3s ease',
    '&: hover': {
      transform: 'scale(0.9)',
    },
  },

  imageModalImageWrapperLeftSideSelected: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },

  imageModalImage: {
    width: 560,
    height: 565,
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageModalImageLeftSide: {
    width: 73,
    height: 73,
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageName: {
    fontWeight: 600,
    fontSize: 14,
    minHeight: 20,
  },

  shortText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 100,
  },

  titleName: {
    marginBottom: 25,
    minHeight: 20,
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

  redText: {
    color: '#DF0C0C',
  },

  zoomDialogContext: {
    padding: 0,
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },
}))
