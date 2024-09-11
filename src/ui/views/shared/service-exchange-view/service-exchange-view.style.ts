import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tablePanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  toggleBtnAndtaskTypeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  searchInput: {
    width: 480,
  },

  emptyTableWrapper: {
    width: '100%',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 30,
  },

  emptyTableText: {
    fontSize: 24,
    color: theme.palette.text.second,
  },

  dashboardListWrapper: {
    marginTop: '20px',
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxHeight: '80vh',
    overflow: 'auto',
    [theme.breakpoints.down(1280)]: {
      gridTemplateColumns: '1fr',
    },
  },

  dashboardCardWrapper: {
    marginTop: '20px',
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    maxHeight: '80vh',
    overflow: 'auto',
    [theme.breakpoints.down(1440)]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.down(1280)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
}))
