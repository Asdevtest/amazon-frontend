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
}))
