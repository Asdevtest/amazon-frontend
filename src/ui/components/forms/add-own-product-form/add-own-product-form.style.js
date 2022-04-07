import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '750px',
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
    fontFamily: 'Montserrat',
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
    borderRadius: '8px',
    width: 'calc(100% - 110px)',
  },

  loadImageInput: {
    height: '26px',
    borderRadius: '8px',
    width: 'calc(100% - 182px)',
  },

  defaultBtn: {
    marginLeft: '10px',
    borderRadius: '8px',
    height: '32px',
    width: '100px',
  },

  loadBtn: {
    marginLeft: '10px',
    borderRadius: '8px',
    height: '26px',
    width: '172px',
  },

  title: {
    marginBottom: '25px',
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
    display: 'flex',
    alignItems: 'center',
  },
}))
