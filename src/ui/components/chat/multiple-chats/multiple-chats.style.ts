import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    height: '100%',

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
