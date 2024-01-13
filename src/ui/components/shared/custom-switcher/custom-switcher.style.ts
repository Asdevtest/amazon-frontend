import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  switcherWrapper: {
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    backgroundColor: theme.palette.customSwitcher.background,
    borderRadius: '21px',
    width: 'fit-content',
  },

  fullWidthWrapper: {
    width: '100%',
  },

  headerStylesSwitcherWrapper: {
    borderRadius: '24px',
    backgroundColor: theme.palette.customSwitcher.headerBackground,
  },

  mediumGapWrapper: {
    gap: 10,
  },

  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  headerOptionWrapper: {
    height: 45,
  },

  mediumOptionWrapper: {
    height: 40,
  },

  switcherOption: {
    height: '100%',
    width: '100%',
    minWidth: 25,
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
    transition: 'all .3s ease',
    color: theme.palette.customSwitcher.text,
    borderRadius: '21px',

    '&:active': {
      color: theme.palette.customSwitcher.text,
      backgroundColor: theme.palette.customSwitcher.headerBackground,
    },
  },

  headerOptionStyles: {
    padding: '0 15px',
    borderRadius: '24px',
  },

  activeOption: {
    cursor: 'unset',
    fontWeight: 600,
    transition: 'all .3s ease',
    color: theme.palette.customSwitcher.activeText,
    backgroundColor: theme.palette.customSwitcher.indicator,

    '&:hover': {
      color: theme.palette.customSwitcher.activeText,
      backgroundColor: theme.palette.customSwitcher.indicator,
    },
  },

  bigOptionStyles: {
    fontSize: '18px',
  },

  mediumOptionStyles: {
    padding: '0 15px',
  },

  headerActiveOptionStyles: {
    color: '#fff',
    background: theme.palette.primary.main,

    '&:hover': {
      color: '#fff',
      background: theme.palette.primary.main,
    },
  },

  icon: {
    color: theme.palette.primary.main,
  },
}))
