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
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    maxHeight: '80vh',
    overflow: 'auto',
  },
}))
