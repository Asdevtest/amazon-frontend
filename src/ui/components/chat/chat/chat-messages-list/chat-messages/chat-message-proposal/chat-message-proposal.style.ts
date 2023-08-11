import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: 30,
    width: 900,
    margin: '0 auto',
    borderRadius: '4px',

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },
  headerAndTimeWrapper: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
  },
  timeText: {
    width: '50px',
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
  },
  mainInfoWrapper: {
    // width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  descriptionWrapper: {
    marginTop: 15,
    marginBottom: 47,
  },
  descriptionText: {
    width: '305px',
    color: theme.palette.text.second,
    fontSize: 18,
    whiteSpace: 'pre-wrap',
  },
  footerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    // alignItems: 'flex-end',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelValueBlockWrapper: {
    width: '100%',
  },
  actionButton: {
    marginLeft: '50px',
    minWidth: '197px',
  },
  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
  cancelBtn: {
    backgroundColor: '#F44336',
    color: '#fff',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },

  mainWrapper: {
    display: 'flex',
    width: '100%',
    gap: '50px',
  },

  rightSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',

    gap: 30,
  },
}))
