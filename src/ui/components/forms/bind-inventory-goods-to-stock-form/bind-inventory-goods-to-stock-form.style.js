import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '850px',
  },

  title: {
    color: theme.palette.text.general,
  },

  mainTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'black',
  },

  tableWrapper: {
    marginTop: '10px',
    height: '30vh',
  },

  chosenGoodsTitle: {
    margin: '24px 0 4px',
    color: theme.palette.text.second,
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  searchBtnText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.primary.main,
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 13px',
  },

  betweenChipsText: {
    margin: '0 17px',
    minWidth: 100,

    color: theme.palette.text.second,
  },

  asinChip: {
    marginLeft: '8px',
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

    borderBottom: '5px solid #0460DE',
  },

  searchInput: {
    // backgroundColor: '#F4F4F4',
    width: '100%',
    height: 40,
    '&:focus-within': {
      backgroundColor: theme.palette.background.main,
    },
  },

  searchContainer: {
    width: '100%',
    margin: '0 0 0 10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
