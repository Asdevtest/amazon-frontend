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
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.general,
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

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,

    borderTop: 'none !important',
    [theme.breakpoints.down(768)]: {
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(3)': {
        display: 'none',
      },
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(5)': {
        marginLeft: '2px',
      },
    },
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',

      alignItems: 'start',

      marginTop: '40px',

      '& > button': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center !important',

        fontSize: '12px',
      },
      '& > button > span': {
        marginRight: 0,
      },
    },
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    border: 0,
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.general,
  },
  filterForm: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',

      '& > div': {
        width: '100%',
      },
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
