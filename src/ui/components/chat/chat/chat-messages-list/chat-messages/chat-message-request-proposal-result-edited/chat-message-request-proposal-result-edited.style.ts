import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 30,
    width: 790,
    margin: '0 auto',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.general,

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

  headerText: {
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase',
  },

  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '19px',
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 18,
    maxHeight: 150,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: 20,
  },

  titleText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },

  resultWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
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

  timeToCheckBlockValueText: {
    fontSize: '14px',
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
    marginTop: '30px',
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
