import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  scrollViewWrapper: {
    width: '100%',
    height: '70%',
  },
  bottomPartWrapper: {
    backgroundColor: 'white',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
  },
  textInputWrapper: {
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
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px',
  },
  textInput: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
}))
