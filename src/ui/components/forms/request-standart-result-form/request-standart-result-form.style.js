import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    minWidth: 300,
    maxWidth: 869,
    margin: '0 auto',
    borderRadius: '4px',
  },

  headerText: {
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
    textTransform: 'uppercase',
  },

  resultText: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
    maxHeight: 151,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  resultWrapper: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
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
    marginTop: 20,
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

  button: {
    padding: '0 25px',
    whiteSpace: 'nowrap',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
}))
