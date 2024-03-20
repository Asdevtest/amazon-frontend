import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    marginRight: '24px',
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  btnsWrapper: {
    width: '100%',

    margin: '10px 0 15px',
    display: 'flex',

    alignItems: 'end',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  cancelBtn: {
    whiteSpace: 'nowrap',
  },

  boxesFiltersWrapper: {
    marginTop: '5px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },

  selectedBoxesBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',
    borderBottom: theme.palette.other.tableActiveFilterBtn,
    color: `${theme.palette.primary.main} !important`,
  },

  storekeeperButton: {
    padding: '0 45px',
    height: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,

    '&>disabled': {
      backgroundColor: 'inherit',
    },
  },

  rightSideButtonsWrapper: {
    display: 'flex',
    gap: 10,
  },

  rightSideButton: {
    width: 209,
  },
}))
