import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogContextClassName: {},
  content: {},
  modalTitle: {},
  boxesWrapper: {
    marginTop: '40px',
    overflowY: 'auto',
    maxHeight: '400px',
    width: '100%',
  },
  warningWrapper: {
    marginTop: '20px',
  },
  warningText: {
    color: 'red',
  },
  btnsWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    display: 'flex',
  },
  btnClose: {
    marginLeft: '10px',
  },
  block: {
    height: '50px',
    backgroundColor: 'f6b2b3a4',
  },
}))
