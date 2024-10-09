import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatsList: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    overflowY: 'scroll',
    paddingRight: '5px',
    boxShadow: theme.palette.boxShadow.box,
    borderRadius: '20px 0 0 20px',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '1px',
      '::-webkit-scrollbar': {
        display: 'block',
      },
    },
  },

  emptyChatList: {
    justifyContent: 'center',
  },
}))
