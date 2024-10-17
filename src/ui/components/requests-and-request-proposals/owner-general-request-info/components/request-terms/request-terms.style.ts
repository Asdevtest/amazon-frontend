import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestInformationWrapper: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  requestInformationTitleWrapper: {
    display: 'flex',
    gap: 15,
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    color: theme.palette.text.second,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    whiteSpace: 'nowrap',
  },

  lnkTitle: {
    fontSize: 14,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
      textDecoration: 'underline',
    },
  },

  confirmationWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '21px',
  },

  doneIcon: {
    color: theme.palette.other.succes,
  },

  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.general,
    borderRadius: 7,
    padding: 20,
    flex: 1,
    gap: 20,
  },

  blockInfoWrapper: {
    display: 'flex',
    width: 140,
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
    color: theme.palette.text.general,
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
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
}))
