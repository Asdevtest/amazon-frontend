import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  nativeSelect: {
    width: '200px',
  },
  numInput: {
    width: '80px',
  },
  commentInput: {
    fontSize: '13px',
    height: 'auto',
    width: '100%',
    marginTop: '2px',
  },
}))
