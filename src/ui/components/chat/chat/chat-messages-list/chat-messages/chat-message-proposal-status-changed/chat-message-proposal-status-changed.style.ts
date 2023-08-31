import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 590,
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
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  titleText: {
    width: '100%',
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  timeText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  reasonText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  statusTextDesciption: {
    color: 'grey',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'end',
    gap: '10px',
  },

  statusText: {
    color: 'black',
  },

  detailsWrapper: {
    width: '100%',
    padding: 30,
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    backgroundColor: theme.palette.background.general,
    borderRadius: 4,
  },

  footerWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  labelValueBlockWrapper: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },

  actionButton: {
    width: 150,
  },

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  editBtn: {
    backgroundColor: '#F44336',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionBtnWrapperStyle: {
    flex: 1,
    display: 'flex',
  },
}))
