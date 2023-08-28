import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 30,
    maxWidth: 790,
    margin: '0 auto',
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

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
    color: theme.palette.text.second,
    fontSize: 18,
    fontWeight: 600,
  },

  timeText: {
    width: '50px',
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
  },
  mainInfoWrapper: {
    marginTop: 16,
    display: 'flex',
    gap: '50px',
    alignItems: 'start',
  },
  descriptionWrapper: {
    marginTop: 18,
  },
  footerWrapper: {
    marginTop: 25,
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > :nth-of-type(2n)': {
      width: '40%',
    },
  },
  labelValueBlockWrapper: {
    // backgroundColor: theme.palette.background.green,
    width: '28%',
  },

  conditionsField: {
    border: 'none',
    resize: 'none',
    color: theme.palette.text.second,
    fontSize: 18,
    fontFamily: 'inherit',
    width: '305px',
    outline: 'none',
    backgroundColor: 'inherit',
  },
}))
