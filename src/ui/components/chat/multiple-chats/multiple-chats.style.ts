import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    border: '1px solid #C4C4C4',
    height: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  chatsWrapper: {
    width: '250px',
    height: '100%',
    borderRightColor: '#000000',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
  },
  chatWrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#EBEBEB',
  },
  companionInfoWrapper: {
    width: '275px',
    height: '100%',
  },
}))
