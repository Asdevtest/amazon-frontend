import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '10px 10px 10px 4px',

    borderLeft: '2px solid transparent',

    cursor: 'pointer',
  },
  rootIsSelected: {
    borderLeftColor: '#006CFF',
  },

  leftSide: {},

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
    color: '#001029',

    maxWidth: 130,
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
    color: '#656565',
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
    backgroundColor: '#006CFF',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '12px',
    lineHeight: '14px',
  },

  messageDate: {
    margin: 0,
    fontSize: 14,
    color: '#656565',
  },
}))
