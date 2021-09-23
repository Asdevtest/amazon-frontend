import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogContextClassName: {},
  content: {},
  modalTitle: {},
  boxesWrapper: {
    marginTop: '40px',
  },
  table: {
    borderCollapse: 'collapse',
    border: 0,
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
}))
