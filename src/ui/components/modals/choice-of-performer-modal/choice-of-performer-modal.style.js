import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
    height: '100%',
    minHeight: 440,
    padding: 20,
  },

  supWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 50,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  label: {
    fontSize: '14px',
    color: theme.palette.text.second,
    margin: '0 !important',
  },

  executorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '370px',
    margin: '0 !important',

    [theme.breakpoints.down(1500)]: {
      width: '320px',
    },
  },

  searchInput: {
    width: 375,

    [theme.breakpoints.down(1500)]: {
      margin: '0px 35px',
    },
  },

  cardsWrapper: {
    padding: 5,
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    gap: 40,
    overflowY: 'auto',
  },

  customSubMainWrapper: {
    padding: '10px 10px !important',
    width: '371px !important',
  },

  customSearchInput: {
    margin: 0,
    width: '100%',
    height: 30,
    marginBottom: 20,
  },

  footerWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
}))
