import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '10px 10px 10px 4px',

    borderLeft: '2px solid transparent',

    // borderLeft: `2px solid ${theme.palette.primary.main}`,

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  rootIsSelected: {
    borderLeftColor: theme.palette.primary.main,
  },

  avatarWrapper: {
    height: '50px',
    width: '50px',
  },

  miniAvatar: {
    height: '15px',
    width: '15px',

    marginRight: 5,
  },

  rightSide: {
    marginLeft: '12px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  titleText: {
    margin: '0',
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.text.general,

    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageWrapper: {
    marginTop: '10px',

    display: 'flex',

    justifyContent: 'space-between',
  },

  lastMessageText: {
    margin: 0,

    fontSize: 14,
    color: theme.palette.text.second,

    // whiteSpace: 'nowrap',

    width: '140px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageSubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  badge: {
    marginTop: 5,
    alignSelf: 'flex-start',
    height: 18,
    width: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.negativeMain,
    fontSize: '12px',
    lineHeight: '14px',
  },

  messageDate: {
    margin: 0,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  readIconsWrapper: {
    width: 35,
    display: 'flex',
    alignItems: 'flex-end',
    // marginLeft: 10,
  },
}))
