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
    marginTop: '20px',
    width: '100%',
    height: '880px',
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
  },

  emptyProposalsIcon: {
    width: '136px',
    height: '136px',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',

    marginTop: '90px',
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
  },

  hideChatButton: {
    margin: '0 auto',
    padding: '14px 77px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
  },
}))
