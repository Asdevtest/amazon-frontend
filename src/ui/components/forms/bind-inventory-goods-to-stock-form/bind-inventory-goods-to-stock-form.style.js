import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 880,
    padding: 10,
  },

  title: {
    color: theme.palette.text.general,
  },

  tableWrapper: {
    marginTop: '10px',
    height: '30vh',
  },

  chosenGoodsTitle: {
    marginTop: 10,
    color: theme.palette.text.second,
  },

  btnsWrapper: {
    paddingRight: 5,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  form: {
    width: '100%',
  },

  filtersWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },

  betweenChipsText: {
    margin: '0 17px',
    minWidth: 100,

    color: theme.palette.text.second,
  },

  chipLeftMargin: {
    marginLeft: '10px',
  },

  chip: {
    marginBottom: 5,
    color: theme.palette.text.general,
    fontSize: '16px',
    // backgroundColor: '#F4F4F4',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  chipActive: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    color: theme.palette.primary.main,

    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },

  searchInput: {
    // backgroundColor: '#F4F4F4',
    flexGrow: 1,
    height: 40,
    marginLeft: '20px',

    '&:focus-within': {
      backgroundColor: theme.palette.background.general,
    },
  },
}))
