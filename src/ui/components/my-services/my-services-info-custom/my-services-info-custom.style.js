import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    padding: '40px',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  mainBlockWrapper: {
    display: 'flex',
    gap: 25,
    minWidth: '100%',
  },

  titleBlockWrapper: {
    display: 'flex',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,

    marginLeft: 5,
  },
  userPhoto: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    objectPosition: 'center',
  },
  requestInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 640,
    height: 140,
    padding: 20,
    border: `1px solid rgba(0,0,0, .1)`,
    borderRadius: 4,
  },

  blockInfoWrapper: {
    display: 'flex',
    width: 103,
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
  },

  button: {
    display: 'flex',
  },

  price: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
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

  oldPrice: {
    textDecoration: 'line-through',
  },
  newPrice: {
    color: '#FB1D5B',
  },

  successDeals: {
    whiteSpace: 'nowrap',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  titleAndCounterkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  buttonAndTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },

  requestTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.main,
  },
  requestTitleAndInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  announcementTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  announcementBlock: {
    display: 'flex',
    flexDirection: 'column',

    gap: 15,

    width: '50%',
  },
  announcementTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  announcementDecription: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    maxHeight: 65,
  },

  dealBtn: {
    width: 180,
  },
}))
