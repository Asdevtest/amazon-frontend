import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestInformationWrapper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  requestInformationTitleWrapper: {
    display: 'flex',
    gap: 15,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  confirmationWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '21px',
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
    height: 180,
    gap: 20,
  },

  blockInfoWrapper: {
    display: 'flex',
    width: 200,
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
    maxWidth: 200,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    color: theme.palette.text.general,
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
