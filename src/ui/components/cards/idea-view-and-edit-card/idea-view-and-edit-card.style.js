import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    width: '100%',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
    padding: '20px',
    overflow: 'hidden',
  },

  cardWrapper: {
    width: '100%',
    marginTop: '20px',

    display: 'flex',
    justifyContent: 'space-between',
  },

  cardBlockWrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cardImg: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  //
  photoWrapper: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: '0 0 35px',
  },

  bigPhotoWrapper: {
    width: '400px',
    height: 280,
    padding: '0 0 35px',
  },

  imgBox: {
    width: '200px',
    height: '130px',
    objectFit: 'contain',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  commentField: {
    height: '140px',
    width: '100%',
    // marginBottom: '25px'
  },

  leftSubBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftDisSubBlockWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    margin: '0px 10px',
  },

  cancelBtn: {
    color: '#fff',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  btnLeftMargin: {
    marginLeft: '40px',
  },

  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  existedIdeaBtnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  existedIdeaBtnsSubWrapper: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  carouselContainer: {
    width: '300px',
  },

  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',

    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: '.8',
    },
  },

  tablePanelViewText: {
    fontSize: '20px',
    lineHeight: '23px',
    color: '#006CFF',

    marginRight: '15px',
  },

  middleBlock: {
    maxHeight: 0,
    overflow: 'hidden',
    transition: ' .3s ease',
  },

  fullMiddleBlock: {
    maxHeight: '100vh',
    overflow: 'visible',
  },

  linksContainer: {
    width: '100%',
  },

  linksWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  linksSubWrapper: {
    width: '100%',
    maxHeight: '200px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },

  linkWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  linkTextWrapper: {
    width: '80%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  linkText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  copyImg: {
    marginRight: 15,
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },

  shortFieldsWrapper: {
    width: '100%',

    justifySelf: 'flex-end',
  },

  shortFieldsSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  shortInput: {
    width: '95%',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',

    width: 341,
  },

  sizesSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  sizesContainer: {
    width: 'min-content',
  },

  sizesInput: {
    width: '100px',
  },

  addOrEditBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  defaultBtn: {
    marginLeft: '10px',
    borderRadius: '4px',
    height: '32px',
    width: '100px',
  },

  input: {
    height: '32px',
    borderRadius: '4px',
    width: 'calc(100% - 110px)',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  linksBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  deleteBtn: {
    width: '20px',
    height: '20px',
  },

  ideaTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: '#001029',
  },

  searchTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    color: '#001029',
  },

  criterionsField: {
    height: 200,
    width: '100%',
  },

  supplierSearchTitle: {
    fontWeight: 600,
    fontSize: 18,
    color: '#001029',
  },
}))
