import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  proposalsWrapper: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  proposalsTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.primary,
  },

  proposalAndChatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.general,
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
    color: theme.palette.text.primary,
  },
}))
