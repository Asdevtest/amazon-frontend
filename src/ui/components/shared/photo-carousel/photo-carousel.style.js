import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },

  imagesCarouselWrapper: {
    width: '100%',
    height: '100%',
  },

  imageWrapper: {
    width: '100%',
    height: '100%',
  },

  emptyIconWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    minWidth: 30,
    minHeight: 80,
    objectFit: 'contain',
  },

  smallImage: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    minWidth: 60,
    minHeight: 60,
    maxHeight: 70,
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
}))
