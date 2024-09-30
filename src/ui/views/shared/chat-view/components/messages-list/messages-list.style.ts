import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  messagesListWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px',

    boxShadow: theme.palette.boxShadow.casualBoxShadow,
    backgroundColor: theme.palette.background.general,
    borderRadius: '0 20px 20px 0',
  },

  noSelectedChat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
