import { keyframes } from '@emotion/react'

const ani = keyframes`
0% {
    transform: translateY(-150%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
`

export const styles = theme => ({
  field: {
    marginTop: theme.spacing(2.5),
  },

  placeRequestBtnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingRight: '5px',
  },

  row: {
    whiteSpace: 'normal',
    cursor: 'pointer',
    transition: '0.3s ease',
  },

  root: {
    boxShadow: theme.palette.boxShadow.paper,
    backgroundColor: theme.palette.background.general,

    // '.MuiTypography-root': {
    //   fontSize: 14,
    //   fontFamily: 'Regular, sans-serif',
    // },
  },

  datagridWrapper: {
    height: '72vh',
  },
  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },

  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    left: '50%',
    padding: '10px',
    marginTop: '63px',
    zIndex: 999,
    opacity: 0,
    transform: 'translateY(-150%)',
    animation: `${ani} 1s forwards`,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    height: 40,
    width: '400px',
  },

  acceptMessage: {
    color: '#00B746',
  },

  waitingCheckedBacklighting: {
    background: theme.palette.background.green,
    zIndex: 100,
  },

  switchButtonWrapper: {
    display: 'flex',
    width: '100%',
    marginBottom: 20,
  },

  btnWrapperStyle: {
    width: 'calc(100% / 2)',
  },

  switchButton: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.second,
    width: '100%',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },

  selectedSwitchButton: {
    color: theme.palette.primary.main,
  },

  switchButtonBorder: {
    '&:after': {
      position: 'absolute',
      bottom: 0,
      content: '" "',
      display: 'block',
      height: 1,
      width: '100%',
      background: theme.palette.primary.main,
    },
  },

  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,

      width: 5,
      height: '98%',
    },
  },

  yellowBorder: {
    background: theme.palette.background.yellowRow,

    '&:hover': {
      background: theme.palette.background.yellowRow,
    },

    '&:after': {
      background: '#C69109',
    },
  },

  redBorder: {
    background: theme.palette.background.redRow,

    '&:hover': {
      background: theme.palette.background.redRow,
    },

    '&:after': {
      background: theme.palette.other.rejected,
    },
  },
})
