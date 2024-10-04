import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatsList: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    boxShadow: theme.palette.boxShadow.box,
    borderRadius: '20px 0 0 20px',
  },

  autoSizer: {
    'div:first-child': {
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

  emptyChatList: {
    justifyContent: 'center',
  },
}))
