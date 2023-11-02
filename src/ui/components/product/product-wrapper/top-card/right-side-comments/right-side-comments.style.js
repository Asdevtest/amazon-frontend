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

export const useClassNames = makeStyles()(theme => ({
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  heightFieldAuto: {
    height: 'auto',
    width: '100%',
    padding: 0,
  },
  buttonsWrapper: {
    position: 'fixed',
    bottom: 50,
    zIndex: 999,
    display: 'grid',
    gridTemplateColumns: 'repeat(4,auto)',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: '20px',
    width: '38%',
  },

  buttonWrapper: {
    position: 'fixed',
    bottom: 50,
    right: 60,
    zIndex: 999,
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
  errorActive: {
    borderColor: 'red',
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
    zIndex: 999,
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
  },

  alertShieldWrapperStyle: {
    left: '44% !important',
  },
}))
