import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '1360px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  modalTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '22px',
      color: theme.palette.text.general,
    },
  },

  subTitle: {
    color: theme.palette.text.general,
  },

  boxCounterWrapper: {
    padding: '8px 11px',
    height: '52px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center',

    position: 'absolute',
    top: 4,
    right: 390,
    zIndex: 100,

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
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  boxCounterCount: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    marginLeft: 5,
  },

  tableWrapper: {
    marginTop: '10px',
    height: 450,
    overflow: 'auto',
    position: 'relative',
  },

  chosenGoodsTitle: {
    color: theme.palette.text.general,
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
  },

  cancelBtn: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '120px',
    },
  },

  filtersWrapper: {
    display: 'flex',
    margin: '20px 0 13px',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  filterField: {
    width: 200,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  sumField: {
    width: '230px',
    margin: 0,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '720px',
    gap: 10,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '10px',
      width: '280px',
      marginBottom: '15px',
    },
  },

  filesWrapper: {
    width: '450px',
    overflow: 'auto',
    [theme.breakpoints.down(768)]: {
      overflow: 'hidden',
      margin: 0,
    },
  },

  actionBtn: {
    width: '144px',
    height: '40px',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    margin: '25px 0 30px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      margin: '25px 0 30px',
    },
  },

  uploadFilesWrapper: {
    width: '690px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
  imageFileInputWrapper: {
    display: 'flex',
    gap: '60px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      flexDirection: 'column',
      gap: '40px',
    },
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '380px',
    height: 36,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },

  tableSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: 24,
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'end',
      marginTop: '15px',
      marginBottom: 24,
    },
  },

  weigthCalcWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  volumeWeightDivider: {
    margin: '0 40px',
    color: theme.palette.text.second,
  },

  imageAndFileInputWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
}))
