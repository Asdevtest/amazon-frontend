import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.third,
    borderRadius: 5,

    '& :first-of-type': {
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
    },

    '& :last-child': {
      borderTopRightRadius: '7px',
      borderBottomRightRadius: '7px',
    },
  },

  settingItem: {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    padding: '0 10px',
    position: 'relative',
  },

  settingItemDuration: {
    color: theme.palette.text.general,
  },

  lastActiveItem: {
    '&:after': {
      content: '""',
      height: '100%',
      position: 'absolute',
      transform: 'translateX(100%)',
      top: 0,
      right: 0,
      borderWidth: '15px 0 15px 10px',
      borderStyle: 'solid',
      borderColor: `transparent ${theme.palette.primary.main}`,
      zIndex: 7,
    },
  },

  withoutBorderRadius: {
    borderRadius: '0 !important',
  },

  withoutBorderRadiusRight: {
    borderTopRightRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
  },

  activeItem: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  settingItemTitle: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
  },

  settingItemActiveTitle: {
    color: '#fff !important',
  },

  finalStatus: {
    backgroundColor: `${theme.palette.other.succes} !important`,
    '&:after': {
      borderColor: `transparent ${theme.palette.other.succes} !important`,
    },
  },

  rejectedStatus: {
    backgroundColor: `${theme.palette.other.rejected} !important`,
    '&:after': {
      borderColor: `transparent ${theme.palette.other.rejected} !important`,
    },
  },
}))
