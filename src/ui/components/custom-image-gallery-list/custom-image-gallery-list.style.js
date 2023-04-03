import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imagesCarouselWrapper: {
    display: 'flex',
    flexWrap: 'wrap',

    width: 379,
    height: 390,
    padding: '10px 5px',
    boxShadow: 'inset -4px -4px 13px rgba(1, 1, 1, 0.17)',

    overflowY: 'auto',
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,

    width: 'calc(100% / 4)',
    maxHeight: 122,

    padding: '0 6px',
    marginBottom: 20,
  },
  emptyIconWrapper: {
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: '25px',
    // marginLeft: '20px',
  },
  emptyIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: '4px !important',
  },
  smallImage: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    width: '100%',
    height: '79px',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoText: {
    textAlign: 'center',
    color: theme.palette.text.second,
  },
  photoTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',

    color: theme.palette.text.general,

    width: '100%',
    maxHeight: 38,

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordBreak: 'break-word',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}))
