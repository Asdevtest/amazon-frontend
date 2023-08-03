import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    width: 57,
    height: 57,
    objectFit: 'contain',
    objectPosition: 'center',
  },

  blockInfoWrapper: {
    display: 'flex',
    width: 145,
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
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.second,
  },
  btnsBlockWrapper: {
    width: 262,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 20,
  },
  recoverBtn: {
    width: '100%',
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
    width: '100%',
  },
  buttonEditRemoveBtnIsShown: {
    marginLeft: '10px',
  },

  deleteBtn: {
    color: '#fff',
    width: 97,
    height: 40,
  },
  editBtn: {
    color: '#fff',
    width: 145,
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
    fontSize: 14,
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
    fontSize: 14,
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

  oldPrice: {
    textDecoration: 'line-through',
  },
  newPrice: {
    color: '#FB1D5B',
  },

  userInfo: {
    display: 'flex',
    gap: 15,
  },

  listingCheckbox: {
    color: theme.palette.primary.main,
  },

  listingText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  listingButton: {
    width: '100%',
  },

  requestInformationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  firstBlock: {
    width: 377,
  },

  secondBlock: {
    width: 670,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  requestInformationCardWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 7,
    boxShadow: theme.palette.boxShadow.paper,
    padding: 20,
  },

  requestInformation: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  sectionSubTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  requestInformationCardInfoTitles: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  sectionText: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.general,

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },

  requestMoreInformation: {
    display: 'flex',
    gap: 40,
  },

  moreInformationSection: {
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 7,
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 7,
    padding: 20,
    height: 171,
  },

  requestInformationTitleWrapper: {
    display: 'flex',
    gap: 15,
  },

  doneIcon: {
    width: '19px !important',
    height: '19px !important',
    color: theme.palette.other.succes,
  },

  confirmationWrapper: {
    display: 'flex',
  },

  thirdBlock: {
    width: 291,
  },

  announcementWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 7,
    boxShadow: theme.palette.boxShadow.paper,
    padding: 20,
    gap: 20,
  },

  announcementInfoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },

  priorityWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  prioritySubWrapper: {
    display: 'flex',
    gap: 5,
  },

  priorityIcon: {
    width: 16,
    height: 18,
  },
}))
