/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 540,
    minHeight: 754,

    padding: '0 10px',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.main,

    marginBottom: 30,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    marginBottom: 10,
  },
  numberInputField: {
    marginBottom: 0,
  },
  input: {
    height: 40,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 40,

    justifyContent: 'flex-end',
  },
  button: {
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
  },
}))
