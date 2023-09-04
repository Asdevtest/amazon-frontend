import { makeStyles } from 'tss-react/mui'

export const useFreelanceRequestDetailsModalStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    gap: '20px',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },

  headerDetails: {
    display: 'flex',
    gap: '80px',

    [theme.breakpoints.down(768)]: {
      gap: '20px',
      flexWrap: 'wrap',
    },
  },

  headerText: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,

    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    span: {
      // color: theme.palette.text.general,
      fontWeight: 600,
    },
  },

  content: {
    display: 'flex',
    gap: '50px',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  categoryTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },

  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '380px',
  },

  productImages: {
    marginTop: '-10px',
    '& > div > div': {
      paddingTop: '0px',
    },
  },

  category: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  },

  filesItem: {
    width: 'fit-content',
  },

  requestInfo: {
    width: '100%',
    flexDirection: 'column',
    gap: '30px',
    display: 'flex',
  },
  suggestDeal: {
    height: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display: 'flex',
    overflow: 'auto',

    '& > div': {
      height: 'fit-content',
    },
  },

  filesList: {
    paddingBottom: '20px',
    width: 'fit-content',
  },
}))
