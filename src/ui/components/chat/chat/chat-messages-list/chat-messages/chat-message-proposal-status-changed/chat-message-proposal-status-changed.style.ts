import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    [theme.breakpoints.down(1280)]: {
      width: 390,
    },
  },

  headerAndTimeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '19px',
  },

  reasonText: {
    marginTop: 10,
    color: theme.palette.text.general,
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
    color: 'black',
  },

  detailsWrapper: {
    marginTop: '5px',
    width: '100%',
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px',
    borderRadius: '4px',
  },

  footerWrapper: {
    marginTop: 20,
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
