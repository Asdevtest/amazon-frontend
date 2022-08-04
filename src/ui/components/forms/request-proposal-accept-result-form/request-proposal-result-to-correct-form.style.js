import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '586px',
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
    marginBottom: '30px',
  },

  btnSubmit: {
    width: '187px',
    height: '40px',
    fontSize: '18px',
    lineHeight: '140%',
  },

  cancelSubmit: {
    color: '#001029',
  },
  inputsWrapper: {
    height: '141px',
  },
  // ratingWrapper: {
  //   marginBottom: '30px',
  // },
}))
