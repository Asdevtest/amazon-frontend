import {keyframes} from '@emotion/react'

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
  multiline: {
    height: 'auto',
    width: '100%',
  },
  field: {
    marginTop: theme.spacing(2.5),
  },
  titleWrapper: {
    marginBottom: theme.spacing(5),
  },
  placeRequestBtnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    paddingRight: '5px',
  },
  tableWrapper: {
    marginTop: '15px',
  },

  row: {
    whiteSpace: 'normal',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.01, 1)',
    },
  },

  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
  },

  datagridWrapper: {
    height: '82vh',
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
    // top: '50%',
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

  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
    display: 'flex !important',
  },
  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },

  waitingCheckedBacklighting: {
    color: theme.palette.background.green,
  },
})
