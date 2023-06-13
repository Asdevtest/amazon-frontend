import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  form: {
    // marginTop: theme.spacing(2.5),
    // marginBottom: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    height: 801,
    maxWidth: 1692,
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '280px',
      overflow: 'hidden',
      marginBottom: theme.spacing(1),
    },
  },

  boxCounterWrapper: {
    padding: '8px 11px',
    height: '52px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center',

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
    width: 216,
    height: 40,
    gap: 5,
  },

  amount: {
    marginLeft: '5px',
  },

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
    },
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
    // alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: 15,
    },
  },

  storekeeperField: {
    maxWidth: '270px',
    margin: 0,
    padding: 0,
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
    borderBottom: '1px solid white',
    position: 'relative',
  },

  virtualScroller: {
    minHeight: 150,
    maxHeight: 450,
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
  },
  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },
  disabled: {
    '-webkit-text-fill-color': `${theme.palette.text.second} !important`,
  },
  batchTitleField: {
    width: '160px !important',
    margin: 0,
  },
  destinationField: {
    width: '270px !important',
    margin: 0,
  },
  volumeWeightField: {
    width: '190px !important',
    margin: 0,
  },
  methodField: {
    width: '270px !important',
    margin: 0,
  },
  dividerField: {
    width: '120px !important',
    margin: 0,
  },
  filesAndButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  shippinCostContainer: {
    width: '190px !important',
    margin: 0,
  },

  closeFieldsWrapper: {
    display: 'flex',
    gap: 30,
  },
}))
