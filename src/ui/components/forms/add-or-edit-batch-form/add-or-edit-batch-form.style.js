import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '1250px',
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

  searchInput: {
    width: '270px',
    height: '30px',
    borderRadius: '22px',
    border: '.5px solid #000000',
  },
  searchInputWrapper: {
    display: 'flex',
  },

  searchBtn: {
    marginLeft: '14px',
    padding: '0 25px',
    height: '30px',
    border: '1px solid #006CFF',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '.3s ease-in-out',

    backgroundColor: 'white',
    color: '#006CFF',
    '&:hover': {
      opacity: '0.5',
    },
    '&:disabled': {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'default',
      opacity: '0.5',
    },
  },

  searchBtnText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: '#006CFF',
  },

  filtersWrapper: {
    display: 'flex',
    margin: '20px 0 13px',
  },

  chip: {
    color: '#000',
    backgroundColor: 'white',
    border: '.5px solid #000000',
    fontSize: '14px',
    transition: '.4s ease-in-out',
    '&:hover, &:focus': {
      transform: 'scale(1.01)',
    },
  },
  chipActive: {
    color: '#fff',
    backgroundColor: '#006CFF',
    '&:hover, &:focus': {
      transform: 'scale(1.01)',
      backgroundColor: '#006CFF',
    },
  },

  betweenChipsText: {
    margin: '0 17px',
  },

  asinChip: {
    marginLeft: '8px',
  },

  addBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 0 10px',
  },

  cancelBtn: {
    marginLeft: '40px',
  },
}))
