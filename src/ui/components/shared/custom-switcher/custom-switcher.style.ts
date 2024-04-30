import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  switcherWrapper: {
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    backgroundColor: theme.palette.background.general,
    borderRadius: '21px',
    width: 'fit-content',
  },

  fullWidthWrapper: {
    width: '100%',
  },

  headerStylesSwitcherWrapper: {
    borderRadius: '24px',
    backgroundColor: theme.palette.background.third,
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

  smallOptionWrapper: {
    height: 16,
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
    color: theme.palette.text.customSwitcher,
    borderRadius: '21px',

    '&:hover': {
      backgroundColor: theme.palette.background.second,
    },
  },

  headerOptionStyles: {
    padding: '0 10px',
    borderRadius: '24px',
  },

  activeOption: {
    cursor: 'unset',
    transition: 'all .3s ease',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.second,
  },

  bigOptionStyles: {
    fontSize: '18px',
  },

  mediumOptionStyles: {
    padding: '0 10px',
  },

  smallOptionStyles: {
    minWidth: 20,
    width: 25,
    fontSize: 12,
    lineHeight: '16px',
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
