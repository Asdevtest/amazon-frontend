import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  messagesListWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 5px',
    overflowY: 'auto',

    paddingRight: '10px',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '6px',
      '::-webkit-scrollbar': {
        display: 'block',
      },
    },
  },

  noSelectedChat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
