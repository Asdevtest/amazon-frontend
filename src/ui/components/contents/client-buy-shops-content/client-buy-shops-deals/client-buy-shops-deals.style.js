import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginBottom: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
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
    color: theme.palette.text.second,
  },

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '290px',
    height: '40px',
    fontSize: '16px',
    paddingLeft: '7px',
  },
}))
