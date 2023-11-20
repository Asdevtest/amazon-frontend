import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  proposalsWrapper: {
    marginTop: '60px',
    '& > :not(:last-child)': {
      marginBottom: '20px',
    },
  },

  proposalsTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  proposalAndChatWrapper: {
    display: 'flex',
    flexDirection: 'column',

    '&:nth-of-type(n)': {
      marginBottom: '30px',
    },
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
}))
