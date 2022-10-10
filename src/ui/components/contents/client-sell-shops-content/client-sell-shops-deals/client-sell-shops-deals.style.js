import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    minHeight: '85vh',
  },
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  formWrapper: {
    marginTop: '32px',
  },
  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },

  row: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  dashboardCardWrapper: {
    width: '100%',
  },

  tablePanelViewWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '20px',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },

  tablePanelViewText: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.primary.main,

    marginRight: '15px',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTableText: {
    marginTop: '30px',
  },

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '290px',
    height: '40px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  searchContainer: {
    width: 'auto',
    marginLeft: '200px',
  },
}))
