import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '586px',
  },
  reasonInputWrapper: {
    width: '374px',
  },
  reasonInput: {
    height: '40px',
    width: '100%',
  },

  inputWrapper: {
    width: '50px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  btnWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'end',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  countTimes: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  label: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  input: {
    width: '35px',
    border: 'none',
    padding: 0,
    margin: 0,

    '& >::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
    },
  },
  inputField: {
    padding: 0,
    margin: 0,
  },

  inputLabel: {},

  btnSubmit: {
    width: '259px',
    height: '40px',
  },
  inputsWrapper: {
    width: '120px',
    display: 'flex',

    borderBottom: '1px solid #e0e0e0',
  },

  reasonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  time: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
    marginBottom: '10px',
  },

  coverLetterWrapper: {
    width: '100%',
    marginTop: '30px',
  },

  coverLetterInput: {
    height: '136px',
  },
}))
