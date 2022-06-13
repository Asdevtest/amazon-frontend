import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainContainer: {
    width: '100%',
  },

  window: {
    width: '100%',
    overflow: 'hidden',
  },

  allPages: {
    display: 'flex',
    alignItems: 'center',
    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },
  allClides: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
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
  },

  buttonDocumentsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  headerCarouselDocumentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '20px 0 20px 0',
  },

  imagesWrapper: {
    width: '50%',
  },

  documentsWrapper: {
    width: '50%',
  },

  documentWrapper: {
    position: 'relative',
    width: '100%',
    color: '#001029',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',

    '&:hover > :not(:last-child)': {
      opacity: '0.3',
    },

    '&:hover > span': {
      display: 'block',
      position: 'absolute',

      textAlign: 'center',
      color: '#001029',
    },
  },

  emptyProposalsIconWrapper: {
    width: '100%',
    display: 'flex',

    alignItems: 'center',
    margin: '24px 0 24px 0',
  },

  emptyProposalsIcon: {
    width: '100px',
    height: '100px',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
  },

  emptyProposalsDescriptionWrapper: {
    width: '70%',
  },

  emptyProposalsTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    color: '#001029',
    marginBottom: '10px',
  },

  emptyProposalsDescription: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#001029',
  },

  filesTitleWrapper: {
    display: 'flex',
    gap: '40%',
    alignItems: 'center',
  },

  emptyIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
}))
