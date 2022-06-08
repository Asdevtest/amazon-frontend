import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
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
    '& > :not(:last-child)': {
      marginBottom: '20px',
    },
  },
  chatWrapper: {
    width: '100%',
    height: '778px',
  },

  proposalsTitle: {
    margin: '50px 0 20px',
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
    color: '#001029',
  },

  proposalAndChatWrapper: {
    display: 'flex',
    flexDirection: 'column',

    '&:nth-child(n)': {
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
}))
