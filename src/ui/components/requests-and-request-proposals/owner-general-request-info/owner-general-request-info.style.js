import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    padding: '40px',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  mainBlockWrapper: {
    minWidth: '45%',
  },
  middleBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: '13%',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0, .1)',
    padding: '10px',
  },
  middleBlockItemInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBlockWrapper: {
    display: 'flex',
    marginBottom: '20px',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    marginLeft: '35px',
  },
  userPhoto: {
    width: 71,
    height: 71,
    objectFit: 'contain',
    objectPosition: 'center',
  },
  requestInfoWrapper: {
    display: 'flex',

    justifyContent: 'space-between',

    width: 950,
    height: 140,

    padding: 20,

    border: `1px solid rgba(0,0,0, .1)`,
    borderRadius: 4,
  },
  requestItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: '15px',
  },
  blockInfoWrapper: {
    display: 'flex',
    width: 121,
    flexDirection: 'column',

    justifyContent: 'space-between',
  },
  blockInfoWrapperLast: {
    width: 'fit-content',
  },
  title: {
    maxWidth: 300,

    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    // height: '60px',
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.second,
  },
  btnsBlockWrapper: {
    width: '23%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    gap: 20,
  },
  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#001029',
    '&:hover': {
      opacity: '0.8',
      background: '#F3AF00',
    },
  },
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  btnsRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnsRowIsLast: {
    marginBottom: 0,
    height: 40,
  },
  buttonWrapperFullWidth: {
    flex: 1,
    display: 'flex',
  },
  button: {
    display: 'flex',
    // flex: 1,
  },
  buttonEditRemoveBtnIsShown: {
    marginLeft: '10px',
  },
  requestStatus: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#00B746',
  },
  successBtn: {
    backgroundColor: '#00B746',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#00B746',
    },
  },
  cancelBtn: {
    color: '#fff',
    // marginLeft: '10px',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },
  deleteBtn: {
    color: '#fff',
    width: 140,
    height: 40,
  },
  editBtn: {
    color: '#fff',
    width: 190,
    height: 40,
  },
  publishBtn: {
    width: '100%',
    height: 40,
  },
  price: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },

  standartText: {
    color: theme.palette.text.general,
  },
  standartTextGrey: {
    color: '#C4C4C4',
  },

  titleAndAsinWrapper: {
    display: 'flex',
    alignItems: 'center',

    gap: 35,
  },

  asinTitleWrapper: {
    display: 'flex',

    gap: 5,
  },
  asinText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',

    color: theme.palette.text.second,
  },
  asinTextDark: {
    color: theme.palette.text.general,
    fontWeight: 600,
  },

  blockInfoCellTitle: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',

    color: theme.palette.text.second,
  },
  blockInfoCellText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    whiteSpace: 'nowrap',

    color: theme.palette.text.main,
  },
  blockInfoCell: {
    display: 'flex',
    flexDirection: 'column',

    gap: 5,
  },
  pricesWrapper: {
    display: 'flex',
    gap: 5,
  },
  twoStepFieldResult: {
    fontWeight: 600,

    color: theme.palette.text.main,
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  newPrice: {
    color: '#FB1D5B',
  },

  linkSpan: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },
}))
