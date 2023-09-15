import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    minHeight: 750,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 30,

    background: theme.palette.background.general,

    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    borderRadius: 4,
  },

  mainRightWrapper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
  },

  mainLeftWrapper: {
    width: '27%',
  },

  title: {
    marginBottom: '50px',
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 17,
  },

  footerWrapper: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    // marginTop: 10,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },

  backBtn: {
    width: '140px',
  },

  successBtn: {
    width: '210px',
  },

  descriptionField: {
    height: '213px !important',
    width: '100%',
  },

  standartText: {
    color: theme.palette.text.second,
  },

  middleSubWrapper: {
    width: '100%',
    display: 'flex',

    justifyContent: 'space-between',

    gap: 20,
  },

  dateWrapper: {
    marginLeft: '20px',
  },

  error: {
    color: 'red !important',
  },

  nameField: {
    height: '40px',
    width: '100%',
    overflowY: 'hidden',
  },

  adviceWrapper: {
    width: '25%',
  },
  adviceTitle: {
    fontSize: '30px',
    lineHeight: '35px',
    fontWeight: '600',
    marginBottom: '22px',
    color: theme.palette.text.general,
  },
  adviceListItem: {
    padding: '0',
  },

  adviceListItemText: {
    marginLeft: '27px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  trainingTextWrapper: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '35px',
    marginTop: 10,
  },

  trainingText: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  trainingLink: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    margin: '0 5px',
  },

  clientInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  userPhoto: {
    width: 60,
    height: 60,
    marginRight: '30px',
  },
  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& > :first-of-type': {
      marginRight: '60px',
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
  subTitle: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    marginTop: '10px',
    marginBottom: '30px',

    color: theme.palette.text.second,
  },

  spanLabel: {
    fontSize: 14,
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  imageFileInputTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.text.general,
  },

  checkbox: { padding: 0 },

  checkboxLabel: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  nameFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },

  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',

    marginBottom: 30,
  },

  listItemDot: {
    width: '8px !important',
  },

  requestTitleName: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    marginBottom: 5,
  },
  requestTitle: {
    marginBottom: 20,
  },

  blockInfoWrapper: {
    display: 'flex',
    // width: 103,
    flexDirection: 'column',
    gap: 20,
  },

  requestTitleAndInfo: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: 25,
  },
  blockInfoCellTitle: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',

    color: theme.palette.text.second,
  },
  price: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },
  blockInfoCellText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    whiteSpace: 'nowrap',

    color: theme.palette.text.main,
  },
  pricesWrapper: {
    display: 'flex',
    gap: 5,
  },
  newPrice: {
    color: '#FB1D5B',
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  blockInfoCell: {
    display: 'flex',
    flexDirection: 'column',
  },
  blockInfoWrapperlast: {
    alignItems: 'flex-end',
  },

  inputTitleWrapper: {
    display: 'flex',
    gap: 5,
  },

  imageFileInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 10,
  },
  imageFileInputSubTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },
  conrainer: {
    marginBottom: '0 !important',
  },
  titleStyle: {
    marginBottom: 10,
  },
  infoBlockWrapper: {
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoCellWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  lastInfoCellWrapper: {
    minWidth: 100,
  },

  editorMaxHeight: {
    maxHeight: 300,
  },
}))
