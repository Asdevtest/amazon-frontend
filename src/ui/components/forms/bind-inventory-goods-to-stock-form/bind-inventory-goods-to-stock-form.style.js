import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '850px',
  },

  mainTitle: {
    fontFamily: 'Noto Sans',
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
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  searchBtnText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: '#006CFF',
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 13px',
  },

  betweenChipsText: {
    margin: '0 17px',
    minWidth: 100,
  },

  asinChip: {
    marginLeft: '8px',
  },

  chipLeftMargin: {
    marginLeft: '10px',
  },

  chip: {
    marginBottom: 5,
    color: '#001029',
    fontSize: '16px',
    backgroundColor: '#F4F4F4',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: '#007bff',
      transform: 'scale(1.01)',
    },
  },

  chipActive: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    color: '#007bff',

    borderBottom: '5px solid #0460DE',
  },

  searchInput: {
    // border: '1px solid #007bff',
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: 40,
  },

  searchContainer: {
    width: '100%',
    margin: '0 0 0 10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
