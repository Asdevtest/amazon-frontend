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
  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnsLeftSide: {},
  btnsRightSide: {
    display: 'flex',
  },
  requestProposalsWrapper: {
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px',
  },

  button: {
    marginRight: '10px',
  },

  detailsWrapper: {
    marginTop: '10px',
  },
  proposalsWrapper: {
    marginTop: '60px',
    '& > :not(:last-child)': {
      marginBottom: '20px',
    },
  },
  chatWrapper: {
    width: '100%',
    height: '778px',
  },

  proposalsTitle: {
    // margin: '50px 0 20px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  emptyProposalsIconWrapper: {
    with: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
  },

  emptyProposalsIcon: {
    width: '136px',
    height: '136px',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',

    marginBottom: '30px',
  },
  emptyProposalsDescription: {
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '28px',
    color: theme.palette.text.general,
  },

  proposalAndChatWrapper: {
    display: 'flex',
    flexDirection: 'column',

    '&:nth-of-type(n)': {
      marginBottom: '30px',
    },
  },

  hideChatButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hideChatButton: {
    width: '250px',
    height: '52px',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: '400',
    marginTop: '10px',
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

  dataGridWrapper: {
    marginTop: 30,
    height: '55vh',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // borderRadius: 4,
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
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

  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
    display: 'flex !important',
    alignItems: 'center !important',
  },
  iconSeparator: {
    padding: '0 1px',
  },
})
