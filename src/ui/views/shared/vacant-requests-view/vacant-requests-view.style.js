import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tablePanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
  },

  tablePanelSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    gap: 30,
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
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

  dataGridWrapper: {
    height: '80vh',
    width: '100%',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 30,
  },

  emptyTableText: {
    fontSize: 25,
    color: theme.palette.text.second,
  },

  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 2,
      top: 1,

      width: 5,
      height: 72,
    },
  },

  yellowBorder: {
    background: theme.palette.background.yellowRow,

    '&:hover': {
      background: theme.palette.background.yellowRow,
    },

    '&:after': {
      background: '#C69109',
    },
  },

  redBorder: {
    background: theme.palette.background.redRow,

    '&:hover': {
      background: theme.palette.background.redRow,
    },

    '&:after': {
      background: theme.palette.other.rejected,
    },
  },

  dashboardCardWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 305px)',
    gap: 30,
  },

  dashboardCardWrapperList: {
    gridTemplateColumns: '1fr',
  },
}))
