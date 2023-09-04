import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  switcherWrapper: {
    padding: 3,
    backgroundColor: theme.palette.background.gray,
    borderRadius: '31px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },

  mediumStylesSwitcherWrapper: {
    height: '40px',
  },

  innerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap',
  },

  switcherOption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    padding: '0 4px',
    height: '100%',
    color: theme.palette.text.general,
    background: 'none',
    minWidth: '40px !important',
    transition: 'background .5s ease',
    zIndex: 3,
    whiteSpace: 'nowrap',

    '&:hover': {
      color: theme.palette.text.general,
      background: 'none',
    },
  },

  activeOption: {
    transition: '.4s ease',
    color: theme.palette.primary.main,
    fontWeight: 600,
    cursor: 'unset',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  bigOptionStyles: {
    fontSize: '18px',
  },

  mediumOptionStyles: {
    padding: '0 15px',
  },

  btnWrapperStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },

  indicator: {
    position: 'absolute',
    height: '100%',
    zIndex: 2,
    borderRadius: '41px',
    transition: '.4s ease',
    backgroundColor: '#fff',
  },
}))
