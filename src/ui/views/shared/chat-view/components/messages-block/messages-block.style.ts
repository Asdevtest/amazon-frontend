import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  messagesListWrapper: {
    flex: 1,
    display: 'flex',
    gap: '5px',
    padding: '10px 5px',
  },

  noSelectedChat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
