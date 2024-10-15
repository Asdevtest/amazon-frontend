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

    '.ant-dropdown-trigger': {
      // display: 'contents',
      // width: '100%',
      // backgroundColor: 'red',
    },
  },

  noSelectedChat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
