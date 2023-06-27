import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
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
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    gap: 5,
  },

  linkWrapper: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 'auto',
    width: '100%',
  },

  supplierSearchTitle: {
    fontWeight: 600,
    fontSize: 18,
    // color: theme.palette.text.general,
    color: theme.palette.text.general,
  },
  demensionsTitle: {
    color: theme.palette.text.general,
  },

  noDataText: {
    color: theme.palette.text.second,
  },

  supplierActionsWrapper: {
    display: 'flex',
  },
  supplierContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '16px',
  },
  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  iconBtnRemove: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
}))
