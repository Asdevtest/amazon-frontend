import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 603,
    padding: 50,
    background: theme.palette.background.general,
    borderRadius: 7,
    gap: '30px',
  },

  modalRoot: {
    padding: '0 !important',
    display: 'flex',
    gap: '40px',
  },

  cardWrapper: {
    width: '100%',
    height: '370px',
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },

  fullCardWpapper: {
    height: 'max-content',
    overflow: 'unset',
  },

  cardBlockWrapper: {
    width: '887px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  nameAndInfoProductWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '691px',
  },

  linksAndDimensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '733px',
  },

  commentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '543px',
  },

  mediaBlock: {
    width: '887px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '40px',
  },

  spanLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
    marginBottom: 0,
  },

  labelWithMargin: {
    marginBottom: '10px',
  },

  photoCarouselWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 343,
  },

  photoWrapper: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
    padding: '0 0 35px',
  },
  bigPhotoWrapper: {
    display: 'flex',
    width: '400px',
    height: 280,
    padding: '0 0 35px',
  },

  noMarginContainer: {
    margin: '0 !important',
  },

  сlientСomment: {
    height: '220px',
  },

  buyerComment: {
    height: '199px',
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

  btnLeftMargin: {
    marginLeft: '40px',
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  existedIdeaBtnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  existedIdeaBtnsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',

    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },

  tablePanelViewText: {
    fontSize: '20px',
    lineHeight: '23px',
    color: theme.palette.primary.main,

    marginRight: '15px',
  },

  middleBlock: {
    maxHeight: 0,
    overflow: 'hidden',
    transition: ' .3s ease',
  },

  fullMiddleBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '100vh',
    overflow: 'visible',
  },

  oneLineField: {
    height: '40px',
  },

  linksWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '21px',
  },

  linksSubWrapper: {
    width: '100%',
    maxHeight: '86px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  linkWrapper: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linkTextWrapper: {
    maxWidth: '90%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  linkText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  shortFieldsSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  shortInput: {
    width: '95%',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  sizesSubWrapper: {
    width: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',

    gap: '10px',
  },

  sizesContainer: {
    width: '110px !important',
  },

  sizesInput: {
    width: '100px',
  },

  approximateCalculationInput: {
    width: '165px',
  },

  addOrEditBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  defaultBtn: {
    marginLeft: '10px',
    height: '40px',
    width: '100px',
  },

  input: {
    height: '40px',
    borderRadius: '7px',
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
    margin: 2,
  },

  deleteBtn: {
    color: theme.palette.text.second,
    width: '20px',
    height: '20px',
  },

  ideaTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  criterionsField: {
    height: 240,
    fontSize: 16,
    lineHeight: '23px',
    width: '100%',
    padding: 0,
  },

  supplierSearchTitle: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.text.general,
  },

  noDataText: {
    color: theme.palette.text.second,
  },

  supplierActionsWrapper: {
    display: 'flex',
    gap: '16px',
  },
  supplierContainer: {},
  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  iconBtn: {
    maxHeight: 40,
    maxWidth: 40,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
  iconBtnRemove: {
    background: 'rgba(224, 32, 32, 1)',

    '&:hover': {
      background: '#8C0000',
    },
  },
  supplierButtonText: {
    maxWidth: '98px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  emptyBlock: {
    width: 200,
  },

  count: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '-20px',

    color: theme.palette.text.second,
  },
  error: {
    color: 'red',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  disableSelect: {
    color: theme.palette.input.customDisabled,
    cursor: 'default',
  },
  orange: {
    color: '#F3AF00 !important',
  },
  red: {
    color: 'red !important',
  },
  green: {
    color: `${theme.palette.text.green} !important`,
  },
  label: {
    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },
  stantartSelect: {
    '&:hover': {
      backgroundColor: theme.palette.background.second,
      opacity: 0.8,
    },
  },
  orderStatusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // width: '247px',

    gap: 10,
  },
  fieldWrapper: {
    margin: '0px !important',
  },
  saveIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  mediumSizeContainer: {
    width: '350px !important',
  },

  sourcesProductWraper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  requestsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    overflow: 'auto',
    paddingBottom: '10px',

    '&::-webkit-scrollbar': {
      height: '9px',
      padding: '2px 2px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#DAE1E9',
      borderRadius: '22px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },

  requestsBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  requestsControlWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  requestsBlockTitle: {
    fontSize: '18px',
    fontWeight: 600,
  },

  requestsControlButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  plusIcon: {
    width: '14px !important',
    height: '14px !important',
  },

  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  statusText: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.other.succes,
  },

  supplierNotFoundText: {
    color: theme.palette.orderStatus.red,
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },

  modalContentWrapper: {
    maxHeight: '616px',
    overflowY: 'auto',
    padding: '30px',

    boxShadow: '0px -4px 13px 0px rgba(135, 135, 135, 0.15) inset',
  },

  supplierFoundWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
  },

  switcherWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },

  approximateCalculationFieldsWrapper: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-end',
  },

  approximateCalculationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '35px',
  },

  approximateCalculationButton: {
    width: '100%',
  },
}))
