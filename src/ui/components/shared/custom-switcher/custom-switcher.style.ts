import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  switcherWrapper: {
    padding: 3,
    backgroundColor: theme.palette.customSwitcher.background,
    borderRadius: '31px',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },

  fullWidthWrapper: {
    width: '100%',
  },

  headerStylesSwitcherWrapper: {
    borderRadius: '7px !important',
    padding: '0',
    backgroundColor: theme.palette.customSwitcher.headerBackground,
  },

  innerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap',
  },

  smallInnerContainer: {
    gap: '0',
  },

  optionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5px',
    height: '100%',
    flex: 1,
  },

  headerOptionWrapper: {
    height: '45px',
    padding: '0 15px',
  },

  mediumOptionWrapper: {
    height: '40px',
  },

  switcherOption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    padding: '0',
    height: '100%',
    width: '100%',
    color: theme.palette.customSwitcher.text,
    background: 'none',
    minWidth: '25px !important',
    transition: 'background .1s ease',
    zIndex: 3,
    whiteSpace: 'nowrap',

    '&:hover': {
      color: theme.palette.customSwitcher.text,
      background: 'none',
    },
  },

  activeOption: {
    transition: '.1s ease',
    color: theme.palette.customSwitcher.activeText,
    fontWeight: 600,
    cursor: 'unset',
    '&:hover': {
      color: theme.palette.customSwitcher.activeText,
    },
  },

  bigOptionStyles: {
    fontSize: '18px',
  },

  mediumOptionStyles: {
    padding: '0 15px',
  },

  headerActiveOptionStyles: {
    color: '#FFF !important',
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
    transition: '.1s ease',
    backgroundColor: theme.palette.customSwitcher.indicator,
  },

  headerIndicatorStyles: {
    backgroundColor: theme.palette.customSwitcher.activeText,
    borderRadius: '7px',
  },

  icon: {
    color: theme.palette.primary.main,
  },
}))
