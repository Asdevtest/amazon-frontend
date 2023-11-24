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
  button: {
    padding: '0 25px',
  },

  buttonDanger: {
    '&:disabled': {
      color: `${theme.palette.button.disabledDangerText} !important`,
    },
  },

  invis: {
    width: 261,
  },

  topHeaderBtnsSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
    overflow: 'visible',
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  datagridWrapper: {
    height: '79vh',
    width: '100%',
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
}))
