import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 100px)',
    overflow: 'hidden',
    marginTop: -10,

    [theme.breakpoints.down(1024)]: {
      padding: 10,
      height: 'calc(100vh - 72px)',
    },
  },

  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: '1 1 auto',

    [theme.breakpoints.down(1024)]: {
      maxWidth: 1023,
    },

    [theme.breakpoints.down(768)]: {
      maxWidth: 767,
    },
  },

  noSelectedChatWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    background: theme.palette.background.general,
    borderRadius: '0 7px 7px 0',
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '93px !important',
    color: theme.palette.primary.main,
  },

  mobileResolution: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  rightSideHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      width: 'max-content',
    },
  },

  noticesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      padding: 8,
    },
  },

  noticesTextActive: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  noticesTextNotActive: {
    color: '#c4c4c4',
  },

  newDialogBtn: {
    height: 40,
    padding: '0 25px',

    [theme.breakpoints.down(768)]: {
      padding: 8,
      borderRadius: 7,
    },
  },
}))
