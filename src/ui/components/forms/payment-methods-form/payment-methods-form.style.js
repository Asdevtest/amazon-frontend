/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 1632,
    padding: '0 10px',

    display: 'flex',
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.general,

    marginBottom: 20,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',

    gap: 30,

    marginTop: 30,
  },
  modalCardsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,

    width: '100%',

    minHeight: 368,
    maxHeight: 600,
    overflow: 'auto',
  },
  actionButton: {
    padding: '0 25px',
  },
}))
