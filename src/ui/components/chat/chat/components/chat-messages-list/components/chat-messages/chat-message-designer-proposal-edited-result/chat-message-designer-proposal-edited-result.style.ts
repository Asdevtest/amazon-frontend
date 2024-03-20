import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    backgroundColor: theme.palette.background.general,
    borderRadius: 7,

    [theme.breakpoints.down(768)]: {
      padding: 20,
    },
  },

  mainWrapper: {
    width: '100%',
  },

  headerWrapper: {
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

  infosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,

    [theme.breakpoints.down(1280)]: {
      flexDirection: 'column',
      gap: 20,
    },
  },

  infosWrapperIsShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      flexDirection: 'column',
      gap: 20,
    },
  },

  descriptionText: {
    width: 530,
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
    wordBreak: 'break-word',

    [theme.breakpoints.down(1750)]: {
      width: '100%',
    },

    [theme.breakpoints.down(1280)]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  imagesWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 15,

    [theme.breakpoints.down(1280)]: {
      justifyContent: 'flex-start',
    },

    [theme.breakpoints.down(768)]: {
      justifyContent: 'center',
    },
  },

  imagesWrapperIsShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      justifyContent: 'flex-start',
    },
  },

  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme.palette.input.customDisabled,
  },

  mainImageWrapper: {
    padding: 3,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 50,
  },

  moreImagesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 50,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.4)',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 50,

    [theme.breakpoints.down(1350)]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 20,
    },
  },

  footerWrapperIsShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 20,
    },
  },

  fieldsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 50,

    [theme.breakpoints.down(1750)]: {
      gap: 40,
    },

    [theme.breakpoints.down(1350)]: {
      width: '100%',
    },

    [theme.breakpoints.down(1280)]: {
      flexWrap: 'wrap',
      gap: 20,
    },
  },

  fieldsContainerIsShowChatInfo: {
    [theme.breakpoints.down(1700)]: {
      width: '100%',
    },

    [theme.breakpoints.down(1550)]: {
      flexWrap: 'wrap',
      gap: 20,
    },
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  simpleSpan: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    fontWeight: '600 !important',
  },

  actionButton: {
    padding: '0 40px',

    [theme.breakpoints.down(1700)]: {
      padding: '0 30px',
    },
  },

  /* btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
  }, */

  /* actionBtnWrapperStyleNotFirst: {
    marginLeft: '42px',
  }, */

  /* editButton: {
    width: '200px',
  }, */

  /* successBtn: {
    width: '197px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  }, */
}))
