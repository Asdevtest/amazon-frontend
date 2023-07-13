/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 540,
    minHeight: 500,

    padding: '0 10px',
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.main,

    marginBottom: 20,
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    marginBottom: 10,
  },
  numberInputField: {
    marginBottom: 20,
  },
  input: {
    height: 40,
  },
  pubInput: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    padding: '0 5px',
    '&:before, &:after': {
      border: 'none',
    },
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

  linksWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  linksSubWrapper: {
    width: '100%',
    maxHeight: 130,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    gap: 5,
    padding: '0 5px 0 15px',
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  },
  linkWrapper: {
    width: '100%',
    minHeight: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkTextWrapper: {
    width: '80%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
  linksBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteBtn: {
    color: theme.palette.text.second,
    width: '20px',
    height: '20px',
  },
  commentFieldWrapper: {
    marginBottom: 20,
  },
  commentField: {
    height: 'auto',
  },
  dragAndDropWrapper: {
    marginBottom: 20,
  },
}))
