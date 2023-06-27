import { makeStyles } from 'tss-react/mui'

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

  arrowIcon: {
    color: theme.palette.primary.main,
  },

  arrowDisabledIcon: {
    color: theme.palette.action.disabled,
  },

  emptyDocs: {
    color: theme.palette.text.second,
  },
  allClides: {
    display: 'flex',
    alignItems: 'center',
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
    '& > :first-of-type': {
      fontSize: '14px',
    },
  },

  documentTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },

  imageTitle: {
    fontSize: '12px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100%',
  },

  documentHover: {
    display: 'none',
  },

  imagesAndFilesWrapper: {
    // height: '100%' /* вернуть если что-то сломается */,
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0 20px 0',
  },

  imagesAndFilesWrapperMini: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
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

  imageSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  emptyProposalsIconWrapperMini: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },

  emptyProposalsIconMini: {
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyProposalsTitleMini: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
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
  noPhotoIcon: {
    width: '80px !important',
    height: '80px !important',
  },

  noDocumentIcon: {
    width: '80px !important',
    height: '80px !important',
    color: '#E0E0E0',
  },

  emptyIconMini: {
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    minWidth: 60,
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

  emptyWrapperMini: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  numberOfFilesFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    '& > :first-of-type': {
      fontSize: '14px',
    },
  },

  noPhotoText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.second,
    marginTop: 15,
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  activeMainIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    background: 'rgb(53, 112, 155)',
    color: '#F5CF00',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '10px',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
}))
