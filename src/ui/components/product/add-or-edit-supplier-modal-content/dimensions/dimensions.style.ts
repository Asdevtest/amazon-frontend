import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sizesWrapper: {
    display: 'flex',
    height: '100%',
  },

  dimensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
  },

  sizesSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sizeContainer: {
    width: '100px',
    margin: '0px !important',
  },

  rateLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    marginBottom: '10px !important',
  },

  sizeInput: {
    width: '85px',
  },

  sizesRightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '15px',
  },

  shortContainer: {
    width: '120px !important',
    margin: '0px !important',
  },

  normalLabel: {
    marginBottom: '10px !important',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    maxWidth: 250,
  },
}))
