import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: 30,
    width: 1074,
    margin: '0 auto',
    border: '1px solid #4CAF50',
    borderRadius: '4px',

    [theme.breakpoints.down(1280)]: {
      width: 390,
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
    textTransform: 'uppercase',
  },

  timeText: {
    marginLeft: '20px',
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
  },
  mainInfoWrapper: {
    width: '100%',
    marginTop: 20,
  },

  titleText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  descriptionWrapper: {
    marginTop: 18,
  },
  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 18,
    maxHeight: 150,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  resultWrapper: {
    width: '100%',
    marginTop: 25,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  resultText: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '140%',
    color: theme.palette.text.general,
    // whiteSpace: 'pre',
    maxHeight: 150,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  timeToCheckBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  timeToCheckBlockLabelText: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },
  timeToCheckBlockValueWrapper: {
    width: '158px',
    padding: '8px 16px 7px 56px',
    backgroundColor: theme.palette.background.general,
    borderRadius: '4px',
    marginTop: 15,
    textAlign: 'end',
  },
  timeToCheckBlockValueText: {
    fontSize: '15px',
    color: theme.palette.text.second,
  },
  footerWrapper: {
    marginTop: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
  },

  btnEditWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
  },
  actionBtnWrapperStyleNotFirst: {
    marginLeft: '42px',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
  },

  editButton: {
    width: '252px',
  },

  successBtn: {
    width: '197px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
}))
