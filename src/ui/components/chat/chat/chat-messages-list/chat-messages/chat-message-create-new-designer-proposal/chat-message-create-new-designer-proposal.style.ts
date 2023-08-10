import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: 30,
    maxWidth: 550,
    margin: '0 auto',
    borderRadius: 7,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },

  headerText: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    position: 'absolute',
    top: 0,
    right: 20,
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 100,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
  },

  footerWrapper: {
    marginTop: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
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

  mainWrapper: {
    display: 'flex',
    gap: 20,
    position: 'relative',
  },

  mainSubWrapper: {
    minWidth: 250,
    maxWidth: '50%',
    // width: 'max-content',
  },

  divider: {
    height: 'auto',
  },

  labelValueBlockWrapper: {
    minWidth: 260,
    maxWidth: 'max-content',

    // marginBottom: 24,
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  infosWrapper: {
    // width: 'max-content',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,

    // display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
    // width: '100%',
    // gridAutoColumns: 'max-content',
    // grid: 'auto-flow',

    minHeight: 120,
  },

  infosProposalWrapper: {
    display: 'flex',
    // flexWrap: 'wrap',
    gap: 20,

    minHeight: 120,
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  massageHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
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

  paragraphWrapper: {
    minHeight: 180,
    marginTop: 20,
    marginBottom: 10,
  },
}))
