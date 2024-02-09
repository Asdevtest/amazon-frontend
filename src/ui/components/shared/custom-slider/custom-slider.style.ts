import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainContainer: {
    height: '100%',
  },

  window: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
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
    width: '40px !important',
    height: '40px !important',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },

  arrowDisabledIcon: {
    color: theme.palette.action.disabled,
    cursor: 'initial',
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
    width: '100%',
    justifyContent: 'space-between',
  },

  modal: {
    maxWidth: '100%',
  },

  headerCarouselDocumentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },

  numberOfFiles: {
    display: 'flex',
    justifyContent: 'center',
    '& > :first-of-type': {
      fontSize: '14px',
    },
  },

  numberOfFilesFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > :first-of-type': {
      fontSize: '14px',
    },
  },
}))
