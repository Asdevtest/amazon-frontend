import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    height: '40px',
    padding: '0 12px',
    position: 'relative',
  },

  settingItemDuration: {
    color: theme.palette.text.general,
  },

  lastActiveItem: {
    paddingRight: '34px',
    ':after': {
      content: '""',
      height: '100%',
      position: 'absolute',
      transform: 'translateX(100%)',
      top: 0,
      right: 0,
      borderWidth: '20px 0 20px 12px',
      borderStyle: 'solid',
      borderColor: `transparent ${theme.palette.primary.main}`,
      zIndex: 3,
    },
  },

  withoutBorderRadius: {
    borderRadius: '0 !important',
  },

  activeItem: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },

  settingItemTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
  },

  settingItemActiveTitle: {
    color: '#fff !important',
  },

  finalStatus: {
    backgroundColor: `${theme.palette.other.succes} !important`,
    ':after': {
      borderColor: `transparent ${theme.palette.other.succes} !important`,
    },
  },

  rejectedStatus: {
    backgroundColor: `${theme.palette.other.rejected} !important`,
    ':after': {
      borderColor: `transparent ${theme.palette.other.rejected} !important`,
    },
  },
}))
