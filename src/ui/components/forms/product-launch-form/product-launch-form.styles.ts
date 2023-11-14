/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '395px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },

  radioButtonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  searchSelectCustomSearchInput: {
    height: 30,
    marginBottom: 20,
  },

  searchSelectCustomSubMainWrapper: {
    padding: '10px 0 !important',
    width: '300px !important',
  },

  searchSelectCustomItemsWrapper: {
    maxHeight: '300px !important',
  },

  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '30px',
  },

  canselButton: {
    color: theme.palette.text.general,
  },
}))
