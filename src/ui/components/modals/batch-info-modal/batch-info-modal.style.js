import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: 801,
    width: 1692,
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '280px',
      overflow: 'hidden',
      marginBottom: theme.spacing(1),
    },
  },

  boxCounterWrapper: {
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    marginRight: 400,

    position: 'absolute',
    zIndex: 999,

    top: 0,
    right: 0,

    borderTop: 'none !important',
    [theme.breakpoints.down(768)]: {
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(3)': {
        display: 'none',
      },
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(5)': {
        marginLeft: '2px',
      },
    },
  },

  boxCounterText: {
    color: theme.palette.text.second,
  },

  boxCounterCount: {
    fontWeight: 600,
    marginLeft: 5,
  },

  modalTitle: {
    marginRight: '100px',
    marginBottom: '0 !important',
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
      marginRight: 0,
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: 40,
  },

  actionButton: {
    width: '126px',
    height: '40px',
  },

  downloadButton: {
    height: 40,
    gap: 5,
  },

  amount: {
    marginLeft: '5px',
  },

  headerSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 30,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: 5,
    },
  },

  datesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 30,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: 5,
    },
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: 15,
    },
  },

  storekeeperField: {
    maxWidth: '270px',
    margin: '0 !important',
    display: 'flex !important',
    justifyContent: 'flex-end !important',
  },
  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'flex-end',
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 270,
    height: 40,

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(768)]: {
      width: '280px',
      height: 36,
    },
  },

  fieldLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '16px',
      color: '#001029',
      fontWeight: 600,
    },
  },
  subFieldLabel: {
    color: theme.palette.text.second,

    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',

    whiteSpace: 'pre-wrap',

    marginBottom: '5px !important',

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
  },
  infoField: {
    height: 40,

    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
  },
  filesSubWrapper: {
    height: '100%',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      minWidth: '280px',

      display: 'flex',
      justifyContent: 'center',
    },
  },
  tableWrapper: {
    height: 590,
    overflowY: 'auto',
    width: '100%',
    position: 'relative',
    border: `1px solid  ${theme.palette.background.second}`,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 7,
  },

  virtualScroller: {
    minHeight: 150,
    maxHeight: 450,
  },

  disabled: {
    WebkitTextFillColor: `${theme.palette.text.second} !important`,
  },
  batchTitleField: {
    width: '160px !important',
    margin: '0 !important',
  },
  destinationField: {
    width: '270px !important',
    margin: '0 !important',
  },
  volumeWeightField: {
    width: '190px !important',
    margin: '0 !important',
  },
  methodField: {
    width: '270px !important',
    margin: '0 !important',
  },
  dividerField: {
    width: '120px !important',
    margin: '0 !important',
  },
  filesAndButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippinCostContainer: {
    width: '190px !important',
    margin: '0 !important',
  },

  closeFieldsWrapper: {
    display: 'flex',
    gap: 30,
  },

  toolbarContainer: {
    height: 52,
    gap: 30,
  },
}))
