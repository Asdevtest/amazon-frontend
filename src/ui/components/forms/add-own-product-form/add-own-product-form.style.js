import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '700px',
  },

  mainTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'black',
  },

  tableWrapper: {
    margin: '10px 0 35px',
    height: '20vh',
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

  searchBtnText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: '#006CFF',
  },

  filtersWrapper: {
    display: 'flex',
    margin: '20px 0 13px',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    height: '32px',
    borderRadius: '4px',
    width: 'calc(100% - 110px)',
  },

  loadImageInput: {
    height: '26px',
    borderRadius: '4px',
    width: 'calc(100% - 182px)',
  },

  defaultBtn: {
    marginLeft: '10px',
    borderRadius: '4px',
    height: '32px',
    width: '100px',
  },

  loadBtn: {
    marginLeft: '10px',
    borderRadius: '4px',
    height: '26px',
    width: '172px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
    marginBottom: '30px',
  },

  skuItemsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 10px',
  },

  skuItemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  deleteBtnWrapper: {
    width: '25px',
    height: '25px',
  },

  deleteBtn: {
    width: '20px',
    height: '20px',
    opacity: '0.5',
  },

  skuItemTitle: {
    fontSize: '20px',
  },

  checkboxWrapper: {
    width: '145px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      opacity: '0.8',
    },
  },
  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
  },
}))
