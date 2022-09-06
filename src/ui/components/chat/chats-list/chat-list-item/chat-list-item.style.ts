import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px 10px 4px',
    borderLeftWidth: '6px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
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
  rightSide: {
    marginLeft: '12px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  titleWrapper: {},

  titleText: {
    margin: '0',

    fontWeight: 600,
    fontSize: 18,

    color: '#001029',
  },
  lastMessageWrapper: {
    marginTop: '10px',
  },

  lastMessageText: {
    margin: 0,

    fontSize: 14,
    color: '#656565',
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
}))
