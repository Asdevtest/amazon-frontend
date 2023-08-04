import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
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
}))
