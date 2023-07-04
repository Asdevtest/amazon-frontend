import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',

    position: 'relative',
    maxHeight: '85vh',
  },

  boxesWrapper: {
    display: 'flex',
    gap: '40px',

    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '36px',
    marginTop: '40px',
    justifySelf: 'flex-end',

    position: 'sticky',
    bottom: 0,
  },

  leftToRedistributeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  leftToRedistribute: {
    color: theme.palette.text.second,
    marginRight: 5,
  },

  modalTitleSubWrapper: {
    display: 'flex',
  },

  standartText: {
    width: 190,
    color: theme.palette.text.general,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  iconText: {
    color: theme.palette.primary.main,
    marginLeft: 5,
    fontWeight: 600,
    fontSize: 18,
  },

  standartIconWrapper: {
    border: 'none',
  },

  iconWrapper: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 5,

    display: 'flex',

    width: 190,
  },

  boxHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 20,
  },

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginRight: 20,
  },

  box: {
    width: 527,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  orderWrapper: {
    width: '100%',
    flexGrow: 1,

    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: '100%',

    flexGrow: 1,
  },
  orderInput: {
    width: '79px',
  },

  img: {
    width: '66px',
    height: '66px',

    objectFit: 'contain',
    objectPosition: 'center',
  },

  miss: {
    color: theme.palette.text.second,
  },

  deleteBtn: {
    color: theme.palette.text.second,
  },

  title: {
    margin: '5px 0',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '299px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    height: 40,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  newBoxes: {
    minWidth: 527,
  },

  bigPlus: {
    width: '67px !important',
    height: '67px !important',
    margin: '15px 0 30px 0',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  alertText: {
    color: 'red',
  },

  newBoxesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    alignItems: 'center',
  },

  radioWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  boxNum: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  needChooseMainBox: {
    width: '100%',
    color: theme.palette.primary.main,
    marginTop: 100,
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },

  itemSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  sizesTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  leftToRedistributeCount: {
    color: theme.palette.text.general,
    fontSize: 18,
  },

  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  demensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  field: {
    marginBottom: '10px !important',
  },

  amountField: {
    marginBottom: '0 !important',
    width: 'min-content !important',
    gap: 15,
    marginRight: 20,
  },

  fieldInput: {
    height: '40px',
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
  },

  icon: {
    padding: 4,
  },
  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
  },

  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  barCodeWrapper: {
    marginLeft: 10,
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
  },
  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  quantityLabel: {
    width: 'min-content',
    whiteSpace: 'unset',
  },
  iconWrapperAndboxNum: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  prepId: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginLeft: 24,

    '& > div': {
      maxWidth: 218,
    },
  },

  prepIdWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    width: 'fit-content',

    '.MuiTypography-root': {
      width: 'fit-content',
    },
  },
}))
