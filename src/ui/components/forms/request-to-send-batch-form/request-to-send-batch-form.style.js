import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  dialogContextClassName: {},
  content: {
    width: '100%',
  },
  modalTitle: {},

  boxesWrapper: {
    marginTop: '20px',
    overflowY: 'auto',
    maxHeight: '550px',
  },
  warningWrapper: {
    marginTop: '20px',
  },
  warningText: {
    color: 'red',
  },
  noWarningText: {
    color: '#006CFF',
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
