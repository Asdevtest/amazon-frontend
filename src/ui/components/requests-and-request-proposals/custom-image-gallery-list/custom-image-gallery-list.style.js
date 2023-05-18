import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imagesCarouselWrapper: {
    display: 'flex',
    flexWrap: 'wrap',

    width: 379,
    height: 390,
    padding: '10px 5px',
    boxShadow: theme.palette.boxShadow.imageList,

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
  },
  emptyIcon: {
    // width: 80,
    // height: 80,
    // backgroundColor: '#e0e0e0',
    // borderRadius: '50%',
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
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    textAlign: 'center',
    color: theme.palette.text.second,

    marginTop: 15,
  },
  photoTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.general,

    width: '100%',
    maxHeight: 38,

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordBreak: 'break-all',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  noPhotoIcon: {
    width: '80px !important',
    height: '80px !important',
  },
}))
