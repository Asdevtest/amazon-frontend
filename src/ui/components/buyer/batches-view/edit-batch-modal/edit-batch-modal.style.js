import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  listsBox: {
    minWidth: '800px',
  },
  btnBox: {
    textAlign: 'right',
  },
  saveBtn: {
    marginRight: '8px',
  },
}))
