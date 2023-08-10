import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  imagesCarouselWrapper: {
    width: '100%',
    height: '100%',
  },

  imageWrapper: {
    width: '100%',
    height: '100%',
  },

  documentWrapper: {
    position: 'relative',
    width: '100%',

    color: theme.palette.text.general,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    img: {
      width: '100%',
    },

    '&:hover > :not(:last-child)': {
      opacity: '0.3',
    },

    '&:hover > span': {
      display: 'block',
      position: 'absolute',

      textAlign: 'center',
      color: theme.palette.text.general,
    },
  },

  documentTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },
  documentHover: {
    display: 'none',
  },
  emptyProposalsIconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0 24px 0',
  },
  emptyProposalsIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIconWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
  },
  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDocumentText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.second,
    marginTop: 15,
  },

  noDocumentIcon: {
    width: '80px !important',
    height: '80px !important',
    color: '#E0E0E0',
  },

  fileTypeIcon: {
    color: theme.palette.primary.main,
  },
}))
