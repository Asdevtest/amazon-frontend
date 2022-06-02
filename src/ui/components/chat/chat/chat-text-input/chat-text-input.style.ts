import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',

    backgroundColor: '#EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    '& .react-mde': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      '& div:last-child': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .mde-textarea-wrapper': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          '& textarea': {
            resize: 'none',
          },
        },
      },
    },
  },

  iconWrapper: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
}))
