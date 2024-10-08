import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
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
    marginTop: 20,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 390px)',
    gap: 30,
  },

  dashboardCardWrapperList: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  fixWidth: {
    width: 160,
  },
}))
