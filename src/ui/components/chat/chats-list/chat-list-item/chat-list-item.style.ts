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
    color: 'black',
    margin: '0',
  },
  lastMessageWrapper: {
    marginTop: '10px',
  },
  lastMessageText: {
    margin: '0',
  },
}))
