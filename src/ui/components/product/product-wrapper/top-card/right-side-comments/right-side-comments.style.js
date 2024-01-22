import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

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

export const useStyles = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
  },

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.second,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },

  rightBoxComments: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },

  buttonsWrapper: {
    position: 'fixed',
    bottom: 50,
    zIndex: 50,
    display: 'grid',
    gridTemplateColumns: 'repeat(4,auto)',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: '20px',
    width: '38%',
    [theme.breakpoints.down(768)]: {
      right: '5px',
    },
  },

  buttonWrapper: {
    position: 'fixed',
    bottom: 50,
    right: 60,
    zIndex: 150,
    width: '33%',
    display: 'grid',
  },

  buttonNormal: {
    flexGrow: 1,
    width: '100%',
  },
  buttonNormalNoMargin: {
    marginRight: 0,
  },
  buttonAccept: {
    backgroundColor: '#00B746',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#00B746',
    },
  },
  buttonDelete: {
    flexGrow: 1,
    width: '100%',
    color: '#fff',
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    '&:hover': {
      backgroundColor: '#c51a1c',
      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },

  restoreBtn: {
    flexGrow: 1,
    marginLeft: '15px',
  },

  buttonClose: {
    flexGrow: 1,
    width: '100%',
    color: '#fff',
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    '&:hover': {
      backgroundColor: '#c51a1c',
      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },

  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    left: '50%',
    padding: '10px',
    marginTop: '63px',
    zIndex: 50,
    opacity: 0,
    transform: 'translateY(-150%)',
    animation: `${ani} 1s forwards`,
  },

  acceptMessage: {
    color: '#00B746',
  },

  rightBoxCommentsWrapper: {
    display: 'flex',
    // flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  alertShieldWrapperStyle: {
    left: '44% !important',
  },

  editorWrapper: {
    minHeight: '120px !important',
    height: '120px !important',
  },
}))
