/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 35,
    width: 485,
    // minHeight: 345,
  },

  сommentsTitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  сommentsTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    gap: 15,

    maxHeight: 150,
    overflowY: 'auto',

    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },

  сommentsTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },

  сommentsText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',

    whiteSpace: 'pre-wrap',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  okButton: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    padding: '0 25px',
  },
}))
