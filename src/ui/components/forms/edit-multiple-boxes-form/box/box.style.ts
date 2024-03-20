import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  box: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  orderWrapper: {
    width: '100%',
    flexGrow: 1,
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
    width: '100%',
    gap: '10px',

    flexGrow: 1,
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
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '299px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    height: 45,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  label: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '8px',
    width: 230,
    height: '40px',
  },

  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },

  barcodeChiplabel: {
    width: 350,
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0 !important',
    width: '100%',
  },

  orderInput: {
    width: '79px',
  },

  superBox: {
    color: theme.palette.primary.negativeMain,
    fontSize: 20,
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
  },

  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
  },

  storekeeperBtn: {
    height: '40px',
  },

  storekeeperTrafficBtn: {
    color: '#ffff',
  },

  fieldInput: {
    height: '40px',
  },

  inputAccent: {
    outline: '2px solid #F5CF00',
  },

  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteBtn: {
    color: theme.palette.text.second,
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
