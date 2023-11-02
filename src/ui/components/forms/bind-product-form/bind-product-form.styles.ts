import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '40px 70px',
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
    gap: '10px',
    width: '255px',
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
    padding: '10px 0 !important',
    width: '255px !important',
  },

  searchSelectCustomItemsWrapper: {
    maxHeight: '300px !important',
  },

  searchSelectCustomSearchInput: {
    padding: '0 5px',
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
