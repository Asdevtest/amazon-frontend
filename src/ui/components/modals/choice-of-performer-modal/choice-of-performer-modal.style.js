/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    width: 1700,
    height: 770,
  },
  cardsWrapper: {
    padding: '10px 0',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  dashboardCardWrapper: {
    width: '100%',
  },

  searchInput: {
    width: 410,
  },

  upWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },

  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
    margin: '0 !important',
  },

  executorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: 'fit-content',
    margin: '0 !important',
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
