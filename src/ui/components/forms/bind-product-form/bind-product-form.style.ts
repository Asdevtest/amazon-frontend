import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '395px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    alignItems: 'center',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
  },

  radioButtonsWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },

  selectedVariationsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    maxHeight: '100px',
    overflowY: 'auto',
  },

  searchSelectCustomSubMainWrapper: {
    width: '300px !important',
  },

  searchSelectCustomItemsWrapper: {
    maxHeight: '300px !important',
  },

  searchSelectCustomSearchInput: {
    height: 30,
    marginBottom: 20,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
  },

  canselButton: {
    color: theme.palette.text.general,
  },
}))
