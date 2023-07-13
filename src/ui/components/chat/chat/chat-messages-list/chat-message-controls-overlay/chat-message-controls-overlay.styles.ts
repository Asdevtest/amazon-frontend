import { makeStyles } from 'tss-react/mui'

export const useChatMessageControlsOverlayStyles = makeStyles()(theme => ({
  controlsOverlay: {
    pointerEvents: 'none',
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0, .1)',
    borderRadius: '20px',
    margin: '0 44px',
    justifyContent: 'flex-end',
  },

  showOverlay: {
    display: 'flex',
  },

  controls: {
    backgroundColor: theme.palette.background.general,
    display: 'flex',
    gap: '16px',
    padding: '6px 16px',
    height: 'fit-content',
    pointerEvents: 'all',
    borderRadius: '8px',
    zIndex: 1499,
    button: {
      all: 'unset',
      cursor: 'pointer',
      color: theme.palette.text.second,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    svg: {
      width: 18,
    },
  },

  largeControlIcon: {
    svg: {
      width: '24px !important',
      height: '24px !important',
    },
  },

  tooltip: {
    backgroundColor: theme.palette.primary.main,
    margin: 'unset !important',
    marginRight: '6px !important',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '6px 12px',
  },

  additionalControlsWrapper: {
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '130px',
    boxShadow: 'unset',
  },

  additionalControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '6px 10px',
    flexDirection: 'column',
    width: '100%',
    background: theme.palette.background.general,
    marginBottom: 5,
  },

  additionalControlsBtn: {
    all: 'unset',
    cursor: 'pointer',
    color: theme.palette.text.second,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: '14px',
    fontWeight: 400,
    width: '100%',
    '&:nth-child(2)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: '7px',
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },

    svg: {
      width: 24,
    },
  },

  removeButton: {
    // borderTop: `1px solid ${theme.palette.divider}`,
    color: `${theme.palette.text.red} !important`,
  },

  replyIconReversed: {
    transform: 'rotateY(180deg)',
    width: '18px !important',
    height: '18px !important',
  },
}))
