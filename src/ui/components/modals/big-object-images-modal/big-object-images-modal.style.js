import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imageModalWrapper: {
    minWidth: '60vw',
    // height: '80vh',
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },

  carouselWrapper: {
    width: 660,
  },

  imageModalImageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    gap: 10,
  },

  imageModalSubWrapper: {
    // display: 'flex',
    // flexDirection: 'column',
    height: 630,
    // justifyContent: 'flex-end',
    overflowY: 'auto',
    // overflowX: 'hidden',
    minWidth: 220,
    // position: 'absolute',
    // bottom: 30,
    // left: 30,
  },

  imageModalSubWrapperRightSide: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  imageModalImageWrapperLeftSide: {
    padding: 5,
    display: 'flex',
    // justifyContent: 'center',
    width: 200,
    height: 'auto',
    gap: 10,

    marginBottom: 10,
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
    height: 560,
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
    marginBottom: 35,
    minHeight: 20,
  },

  imageComment: {
    fontSize: 18,
    color: theme.palette.text.second,
  },

  imageLeftSideComment: {
    fontSize: 14,
    color: theme.palette.text.second,
    wordBreak: 'break-word',
  },

  redText: {
    color: '#DF0C0C',
  },
}))
