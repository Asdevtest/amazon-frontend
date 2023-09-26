import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      padding: '20px 16px',
    },
  },

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    marginBottom: 10,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.general,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  timeText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  descriptionText: {
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    wordBreak: 'break-word',
    color: theme.palette.text.general,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  infosWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(1350)]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  infosWrapperShowChatInfo: {
    [theme.breakpoints.down(1500)]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  infosSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: 0.8,

    [theme.breakpoints.down(1350)]: {
      flex: 1,
    },
  },

  fieldsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,

    [theme.breakpoints.down(1280)]: {
      flexWrap: 'wrap',
    },
  },

  fieldsRowShowChatInfo: {
    [theme.breakpoints.down(1600)]: {
      flexWrap: 'wrap',
    },
  },

  fieldLabel: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  fieldContainer: {
    marginBottom: 0,
  },

  infoItemWrapper: {
    height: 40,
    width: '100%',
    minWidth: 140,
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    borderRadius: 7,
    background: theme.palette.background.second,
  },

  infoItemText: {
    fontSize: 18,
    lineHeight: '25px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    color: theme.palette.text.general,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  infoItem: {
    height: 40,
    width: '100%',
    minWidth: 140,
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
    background: theme.palette.background.green,
    borderRadius: 7,

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  infoItemList: {
    maxHeight: 170,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  btnsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,

    [theme.breakpoints.down(1350)]: {
      flexDirection: 'column',
    },
  },

  btnsWrapperShowChatInfo: {
    [theme.breakpoints.down(1500)]: {
      flexDirection: 'column',
    },
  },

  button: {
    [theme.breakpoints.down(1350)]: {
      width: '100%',
    },
  },

  buttonShowChatInfo: {
    [theme.breakpoints.down(1500)]: {
      width: '100%',
    },
  },

  actionButton: {
    width: '100%',
    padding: '0 15px',
  },

  editButton: {},

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
}))
