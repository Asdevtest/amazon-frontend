/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 540,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.main,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderRadius: 7,
  },

  linksWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  pubInput: {
    width: '100%',
    height: 40,
    borderRadius: 7,
    padding: '0 5px',

    '&:before, &:after': {
      border: 'none',
    },
  },

  button: {
    padding: '0 25px',
  },

  linksSubWrapper: {
    maxHeight: 130,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 10px',
    boxShadow: 'inset 0 -4px 13px rgba(135, 135, 135, 0.15)',
  },

  linkWrapper: {
    minHeight: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linkText: {
    width: '95%',
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

  buttonsWrapper: {
    display: 'flex',
    gap: 40,
    justifyContent: 'flex-end',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
}))
