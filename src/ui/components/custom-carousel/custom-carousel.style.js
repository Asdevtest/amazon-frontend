import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
  },

  window: {
    width: '100%',

    overflow: 'hidden',
    height: '100%',
  },

  allPages: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },

  emptyDocs: {
    color: theme.palette.text.second,
  },
  allClides: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
    height: '100%',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  headerCarouselWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  proposalCount: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',

    color: theme.palette.text.general,
  },

  buttonDocumentsWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  headerCarouselDocumentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  numberOfFiles: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    '& > :first-child': {
      fontSize: '14px',
    },
  },

  documentTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },

  documentHover: {
    display: 'none',
  },

  emptyDocumentIcon: {
    display: 'flex',

    justifyContent: 'center',
    marginTop: '30px',
  },

  imagesAndFilesWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',

    // margin: '20px 0 20px 0',
  },

  imagesAndFilesWrapperColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },

  imagesCarouselWrapper: {
    width: '100%',
    height: '100%',
  },

  imageWrapper: {
    width: '100%',
    height: '100%',
  },

  imagesWrapper: {
    width: '50%',

    height: '100%',
  },

  notToShowEmptyWrapper: {
    width: '100%',
  },

  documentsWrapper: {
    width: '50%',
    display: 'flex',
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

  emptyProposalsIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    minWidth: '400px',
    alignItems: 'center',
    margin: '24px 0 24px 0',
  },

  emptyProposalsIcon: {
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyProposalsDescriptionWrapper: {
    // marginLeft: '5%',
  },

  emptyProposalsTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  emptyProposalsDescription: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.general,
  },

  filesTitleWrapper: {
    display: 'flex',
    gap: '40%',
    alignItems: 'center',
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

  image: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    minWidth: 60,
    minHeight: 60,
    // height: 50,
    maxHeight: '100%',
    objectFit: 'contain',

    // objectPosition: 'center center',
  },

  smallImage: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    minWidth: 60,

    minHeight: 60,
    // height: 50,
    maxHeight: 105,
    objectFit: 'contain',
  },

  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberOfFilesFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    '& > :first-child': {
      fontSize: '14px',
    },
  },

  noPhotoText: {
    textAlign: 'center',
    color: theme.palette.text.second,
  },
}))
