import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '586px',
  },
  reasonInputWrapper: {
    width: '100%',
    height: '100%',
  },
  reasonInput: {
    height: '150px',
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
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
  },

  label: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  input: {
    // width: '35px',
    width: '100px',

    border: 'none',
    padding: 0,
    margin: 0,

    borderRadius: 0,

    borderBottom: '1px solid #e0e0e0',

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

  inputLabel: {
    color: theme.palette.text.second,
  },

  btnSubmit: {
    width: '259px',
    height: '40px',
  },
  inputsWrapper: {
    // width: '300px',
    display: 'flex',
    // justifyContent: 'space-between',

    gap: 30,

    // borderBottom: '1px solid #e0e0e0',
  },

  reasonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  time: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '10px',
  },

  coverLetterWrapper: {
    width: '100%',
    marginTop: '30px',
  },

  coverLetterInput: {
    height: '136px',
  },
  totalTime: {
    marginBottom: '30px',
  },
}))
