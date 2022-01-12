import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '800px',
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

  amazonLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  amazonLinkInput: {
    height: '26px',
    borderRadius: '8px',
    width: 'calc(100% - 110px)',
  },

  loadImageInput: {
    height: '26px',
    borderRadius: '8px',
    width: 'calc(100% - 182px)',
  },

  parseBtn: {
    marginLeft: '10px',
    borderRadius: '8px',
    height: '26px',
    width: '100px',
  },

  loadBtn: {
    marginLeft: '10px',
    borderRadius: '8px',
    height: '26px',
    width: '172px',
  },
}))
