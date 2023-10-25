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
  tableWrapper: {
    height: '72vh',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    flexWrap: 'wrap',

    [theme.breakpoints.down(1282)]: {
      gap: 20,
    },
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 405,
    height: '40px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  pickupOrdersButton: {
    padding: '0 20px',
    height: 40,
    color: '#fff',
    display: 'flex',
    gap: 10,
  },

  downloadIcon: {
    color: '#fff',
  },

  disabledDownloadIcon: {
    color: theme.palette.button.disabledText,
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

  successRow: {
    boxShadow: 'inset 0 0 35px rgba(0, 255, 0, .5)',
  },

  button: {
    padding: '0 15px 5px',
    height: 40,
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center !important',
    gap: '12px',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 600,
    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  selectedBoxesBtn: {
    paddingBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },
})
