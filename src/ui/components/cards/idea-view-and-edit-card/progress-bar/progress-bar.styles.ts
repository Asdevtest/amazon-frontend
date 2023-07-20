import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.third,
    borderRadius: 5,

    overflow: 'hidden',
  },

  settingItem: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0 20px',
    position: 'relative',
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
    },
  },

  activeItem: {
    backgroundColor: theme.palette.primary.main,
  },

  settingItemTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  settingItemActiveTitle: {
    color: '#fff',
  },
}))
