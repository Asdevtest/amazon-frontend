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
})
