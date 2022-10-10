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
    alignItems: 'center',
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
    // gap: '46px',
    justifyContent: 'space-between',
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
  labelShipping: {
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  checkboxSizesContainer: {
    width: '190px',
    marginLeft: '5px',
    marginTop: '30px',
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },

  sizesLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#c4c4c4',
    cursor: 'pointer',
  },

  selectedLabel: {
    color: '#006CFF',
  },
  selectedIndicator: {
    backgroundColor: '#006CFF',
  },
  toggleItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  indicator: {
    display: 'block',
    backgroundColor: '#006CFF',
    width: '2px',
    height: '10px',
  },

  editAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
  },

  chipWrapperEditAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
    padding: 5,
  },

  toggleSizesWrapper: {
    marginRight: 30,
  },

  '@media (max-width: 768px)': {
    boxesWrapper: {
      flexDirection: 'column',
    },
    sectionTitleWrapper: {
      marginTop: '30px',
    },
    fieldsWrapper: {
      margin: '0 5px',
      flexDirection: 'column',
    },
    field: {
      width: '100%',
    },
    smallLabel: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
    boxWrapper: {
      padding: '20px 20px',
    },
    currentBox: {
      width: '100%',
    },
    newBoxes: {
      width: '100%',
    },
    mobileDemensions: {
      fontSize: '14px',
      lineHeight: '19px',
    },
    boxInfoWrapper: {
      flexDirection: 'column',
      gap: '30px',
    },
    photoSubWrapper: {
      height: '250px',
      // marginLeft: '-50px',
      // display: 'flex',
      // justifyContent: 'center',
    },
    photoAndFilesTitle: {
      width: '243px',
      textAlign: 'center',
    },
    photoWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
    },
    imagesWrapper: {
      width: '100%',
      // marginRight: 20,
      // paddingRight: 60,
    },
    footerWrapper: {
      flexDirection: 'column',
      gap: '14px',
    },
    labelShipping: {
      width: '100px',
    },

    subTitle: {
      padding: 0,
    },

    chipWrapper: {
      gap: '10px',
    },
    editBtnWrapper: {
      flexDirection: 'column',
      gap: '20px',
    },
    tablePanelSortWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    },
    receiveBoxWrapper: {
      width: '100%',
      marginBottom: '50px',
    },

    imageBox: {
      width: '180px',
    },

    receiveBoxTitle: {
      fontSize: '14px',
      lineHeight: '19px',
      marginTop: '40px',
    },
  },
}))
