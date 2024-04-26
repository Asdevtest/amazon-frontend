import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },

  columnMenuWrapper: {
    display: 'flex',
    width: '300px',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    gap: '10px',
  },

  radioButtonsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    width: 'calc(50% - 10px)',
    height: 30,
  },

  inputInnerSpace: {
    width: '100%',
  },

  searchInput: {
    width: '100%',
    height: '30px',
  },

  noOptionText: {
    color: theme.palette.text.second,
  },

  filterItemsWrapper: {
    width: '100%',
    height: '245px',
    overflowY: 'auto',
    textAlign: 'center',

    boxShadow: theme.palette.boxShadow.filter,
  },
}))
