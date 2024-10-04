import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  messagesListWrapper: {
    flex: 1,
    display: 'flex',
    gap: '5px',
    padding: '10px 5px',
  },

  autoSizer: {
    '& > *:nth-child(1)': {
      paddingRight: '4px',

      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '4px',
        background: 'transparent',
        display: 'none',
      },

      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },

      '&:hover': {
        paddingRight: '4px',

        '::-webkit-scrollbar': {
          display: 'block',
        },
      },
    },
  },

  noSelectedChat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
