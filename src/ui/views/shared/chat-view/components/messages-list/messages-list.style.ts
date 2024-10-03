import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  messagesListWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 5px',
    paddingRight: '9px',

    overflowY: 'auto',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '5px',
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
