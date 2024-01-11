import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestInformationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  secondBlock: {
    width: 670,
  },

  requestInformationTitleWrapper: {
    display: 'flex',
    gap: 15,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  confirmationWrapper: {
    display: 'flex',
  },

  doneIcon: {
    width: '19px !important',
    height: '19px !important',
    color: theme.palette.other.succes,
  },

  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.general,
    borderRadius: 7,
    padding: 20,
    height: 171,
  },

  blockInfoWrapper: {
    display: 'flex',
    width: 145,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  blockInfoCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
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

  price: {
    color: theme.palette.text.general,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },

  blockInfoWrapperLast: {
    width: 'fit-content',
  },
}))
