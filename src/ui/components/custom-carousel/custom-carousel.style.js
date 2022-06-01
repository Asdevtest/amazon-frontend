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

    transition: 'translate',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  carouselBtn: {
    backgroundColor: 'inherit',
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
}))
