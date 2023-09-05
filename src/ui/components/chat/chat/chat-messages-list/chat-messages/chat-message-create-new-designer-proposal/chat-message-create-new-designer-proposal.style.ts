import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    position: 'relative',
    padding: 30,
    maxWidth: 790,
    margin: '0 auto',
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },

  timeText: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  mainWrapper: {
    display: 'flex',
    gap: 20,
  },

  mainSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '1 1 auto',
  },

  massageHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  headerText: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19px',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  idWrapper: {
    display: 'flex',
    gap: 5,
  },

  idTitle: {
    color: theme.palette.text.general,
  },

  idText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 100,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
  },

  paragraphWrapper: {
    minHeight: 180,
    marginBottom: 20,
  },

  infosWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 20,
  },

  labelValueBlockWrapper: {
    minWidth: 260,
    maxWidth: 'max-content',
  },

  fieldLabel: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  divider: {
    height: 'auto',
  },

  footerWrapper: {
    marginTop: '20px',
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '20px',
    gap: 40,
  },

  actionButton: {
    padding: '0 15px',
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

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },
}))
