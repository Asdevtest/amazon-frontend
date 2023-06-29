import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    height: '82.5vh',
  },
  placeAddBtnWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '5px',
    [theme.breakpoints.down(768)]: {
      paddingRight: '10px',
    },
  },

  btnsWrapper: {
    display: 'flex',
  },

  openArchiveBtn: {
    padding: '0 30px',
    color: theme.palette.primary.main,
  },

  addressMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  addressSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  addressMain: {
    color: theme.palette.text.general,
  },

  address: {
    color: theme.palette.text.second,
  },

  placeAddBtn: {
    width: '159px',
    height: '40px',
    marginLeft: 30,
    [theme.breakpoints.down(768)]: {
      width: '91px',
      marginLeft: 0,
    },
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    backgroundColor: theme.palette.background.general,
  },

  footerCell: {
    padding: 0,
    margin: 0,
  },
  footerContainer: {
    position: 'absolute',
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
  toolbarContainer: {
    height: '52px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      alignItems: 'start',
      marginTop: '40px',
      '& > button': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center !important',
        fontSize: '12px',
      },
      '& > button > span': {
        marginRight: 0,
      },
    },
  },
  filterForm: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',

      '& > div': {
        width: '100%',
      },
    },
  },
}))
