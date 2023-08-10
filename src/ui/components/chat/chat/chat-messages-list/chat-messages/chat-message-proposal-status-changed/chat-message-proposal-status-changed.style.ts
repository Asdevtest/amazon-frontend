import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 550,
    padding: '10px 0',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(1280)]: {
      width: 390,
    },
  },
  statusTextDesciption: {
    color: 'grey',
    fontSize: '18px',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'end',
    gap: '10px',
  },
  statusText: {
    fontSize: '18px',
    color: 'black',
  },
  detailsWrapper: {
    marginTop: '5px',
    width: '100%',
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
  },
  titleText: {
    fontSize: 18,
    fontWeight: 700,

    color: theme.palette.text.general,
  },

  reasonText: {
    marginTop: '10px',
    color: theme.palette.text.general,
  },

  headerAndTimeWrapper: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeText: {
    marginLeft: '20px',
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
  },
  footerWrapper: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerRow: {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&:not(:first-of-type)': {
      marginTop: '20px',
    },
  },
  labelValueBlockWrapper: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },

  actionButton: {
    height: '40px',
    width: 217,
  },
  successBtn: {
    width: '107px',
    marginLeft: '30px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
  editBtn: {
    width: '214px',
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  btnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionBtnWrapperStyle: {
    flex: 1,
    display: 'flex',
  },
}))
