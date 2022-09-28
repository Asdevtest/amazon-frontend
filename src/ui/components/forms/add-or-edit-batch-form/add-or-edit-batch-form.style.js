import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '1360px',
  },

  modalTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
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
    height: '37vh',
    overflow: 'auto',
  },

  chosenGoodsTitle: {
    margin: '24px 0 4px',
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  cancelBtn: {
    color: '#001029',
  },

  // searchInput: {
  //   width: '270px',
  //   height: '30px',
  //   borderRadius: '22px',
  //   border: '.5px solid #000000',
  // },
  searchInputWrapper: {
    display: 'flex',
  },

  searchBtn: {
    marginLeft: '14px',
    padding: '0 25px',
    height: '30px',
    border: '1px solid #006CFF',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    justifyContent: 'space-between',
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

  filterField: {
    width: '220px',
  },

  sumField: {
    width: '230px',
    margin: 0,
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '720px',
  },

  filesContainer: {
    marginTop: '20px',
    width: 'auto',
    marginRight: '50px',
  },

  filesWrapper: {
    width: '450px',
    overflow: 'auto',
  },

  linkText: {
    color: '#007BFF',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'auto',

    '&:hover': {
      opacity: '0.8',
    },
  },

  actionBtn: {
    width: '144px',
    height: '40px',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    margin: '25px 0 30px',
  },

  uploadFilesWrapper: {
    width: '690px',
  },
  imageFileInputWrapper: {
    display: 'flex',
    gap: '60px',
  },
  photoAndFilesWrapper: {
    height: '200px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
    justifySelf: 'flex-start',
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
