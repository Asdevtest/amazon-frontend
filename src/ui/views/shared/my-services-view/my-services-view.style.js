import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },

  tablePanelWrapper: {
    width: '100%',
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
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
  },

  rightAddingBtn: {
    padding: '0 50px',
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

  dashboardCardWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 390px)',
    gap: 30,
  },

  dashboardCardWrapperList: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))
