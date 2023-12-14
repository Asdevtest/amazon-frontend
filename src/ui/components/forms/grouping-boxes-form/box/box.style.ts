import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  box: {
    width: 527,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  radioWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  standartText: {
    flexGrow: 1,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  orderWrapper: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,

    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  boxHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },

  iconWrapperAndboxNum: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  iconWrapper: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 5,

    display: 'flex',
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

  boxNum: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  amountField: {
    marginBottom: '0 !important',
    gap: 15,
    width: '100%',
    justifyContent: 'flex-end',
  },

  orderInput: {
    width: '79px',
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: '100%',

    flexGrow: 1,
  },

  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
  },

  img: {
    width: '66px',
    height: '66px',

    objectFit: 'contain',
    objectPosition: 'center',
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
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

  barCodeWrapper: {
    marginLeft: 10,
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  miss: {
    color: theme.palette.text.second,
  },

  field: {
    marginBottom: '10px !important',
  },

  quantityLabel: {
    width: 'min-content',
    whiteSpace: 'unset',
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

  fieldInput: {
    height: '40px',
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

  bottomBlockWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteBtn: {
    color: theme.palette.text.second,
  },

  prepId: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    '& > div': {
      maxWidth: 218,
    },
  },

  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
    cursor: 'pointer',
  },

  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  icon: {
    padding: 4,
  },
}))
