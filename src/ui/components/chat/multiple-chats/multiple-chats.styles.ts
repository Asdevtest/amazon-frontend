import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
  },

  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },

  chatWrapper: {
    borderRadius: 0,
    paddingTop: 0,
  },

  header: {
    height: 43,
    padding: '6.5px 37px 6.5px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    background: theme.palette.background.general,
    borderBottom: `1px solid ${theme.palette.background.chatIncomeMessage}`,
    borderRadius: '0 7px 0 0',
  },

  searchMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  searchInput: {
    fontSize: 14,
    lineHeight: '19px',
    width: 305,
    height: 30,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  searchResult: {
    width: 140,
    color: theme.palette.text.second,

    [theme.breakpoints.down(1024)]: {
      fontSize: 12,
    },
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '92px !important',
    color: theme.palette.primary.main,
  },

  noChatTitle: {
    fontSize: 24,
    color: theme.palette.text.second,
    margin: '30px 0 10px',
  },

  noChatSubTitle: {
    fontSize: 18,
    color: theme.palette.text.general,
  },

  noSelectedChatWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    background: theme.palette.background.general,
    borderRadius: '0 7px 7px 0',
  },

  mobileResolution: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}))
