const {makeStyles} = require('@material-ui/core')

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  divider1: {
    margin: '0px -24px',
  },
  labelInputWrapper: {
    margin: '48px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '400px',
    marginLeft: '8x',
    padding: '0 10px',
  },
  divider2: {
    margin: '0px -24px',
  },
  btnsWrapper: {
    marginTop: '16px',
    textAlign: 'right',
  },
  btnClose: {
    marginLeft: '8px',
  },
}))
