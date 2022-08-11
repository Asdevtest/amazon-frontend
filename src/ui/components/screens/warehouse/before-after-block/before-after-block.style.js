import {tooltipClasses} from '@mui/material/Tooltip'

const {makeStyles} = require('@material-ui/core')

export const useClassNames = makeStyles(() => ({
  boxWrapper: {
    padding: '20px 30px',
  },
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
    width: '690px',
  },

  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  // newBoxesWrapper: {
  //   maxHeight: '730px',
  //   overflow: 'auto',
  //   overflowX: 'hidden',
  // },
  newBoxes: {},

  itemsWrapper: {
    marginTop: '5px',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '14px',
    marginLeft: '10px',
  },
  select: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
  },
  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    // padding: '10px',
    width: '100%',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    // marginTop: '10px',
    // padding: '5px',
  },
  categoryTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '5px',
    marginTop: '10px',
    height: '220px',
  },
  editBtn: {
    width: '183px',
    height: '40px',
    display: 'flex',
  },
  bottomBlockWrapper: {
    marginTop: '20px',
  },
  editBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noEditBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  superWrapper: {
    display: 'flex',
    gap: '5px',
  },
  barCodeActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  shippingLabelField: {
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
    width: '250px',
    height: '45px',
    overflowX: 'auto',
  },
  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  boxInfoWrapper: {
    display: 'flex',
    gap: '76px',
  },

  imagesWrapper: {
    // marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    // padding: '5px',
  },

  photoWrapper: {
    width: '300px',
    marginLeft: '20px',
    minHeight: '150px',
  },

  photoSubWrapper: {
    height: '100px',
    marginTop: '10px',
  },

  imgBox: {
    width: '230px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  link: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  checkboxContainer: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
    margin: 0,
  },

  imageLinkListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',
    padding: '5px',

    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    width: 90,
    justifyContent: 'space-between',
    margin: '0',
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  image: {
    width: 120,
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: 3,
  },

  fileName: {
    maxWidth: 120,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',
  },

  tooltipWrapper: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  linkTypo: {
    height: '100px',
    color: 'white',
    width: '300px',
    overflowX: 'auto',
  },

  tooltipText: {
    maxWidth: '300px',
  },

  greenText: {
    color: 'green',
  },

  field: {
    width: '330px',
  },

  sectionTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
  },
  sectionTitleWrapper: {
    marginBottom: '20px',
  },

  hideBlock: {
    maxHeight: 0,
    overflow: 'hidden',
  },

  showFullBlock: {
    maxHeight: '100%',
    overflow: 'visible',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    cursor: 'pointer',
  },

  tablePanelViewText: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
    color: '#006CFF',
  },

  photoAndFilesTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
    fontWeight: '600',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
    fontWeight: 400,
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  barCodeField: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#006CFF',
    fontWeight: '400',
  },

  subTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
    fontWeight: 600,
  },
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  receiveBoxWrapper: {
    width: '690px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  receiveBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    width: '183px',
    height: '40px',
  },

  receiveBoxTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
    color: '#001029',
    marginTop: '90px',
  },

  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
}))
