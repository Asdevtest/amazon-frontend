import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '1360px',
    padding: 10,
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
    display: 'flex',
    alignItems: 'center',
    gap: 5,
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
    color: theme.palette.text.second,
  },

  tableWrapper: {
    marginTop: '10px',
    height: 450,
    width: '100%',
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
}))
