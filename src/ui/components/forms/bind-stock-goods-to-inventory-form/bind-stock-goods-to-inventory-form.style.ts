import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 1200,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  text: {
    color: theme.palette.text.second,
  },

  tableWrapper: {
    flex: '1 1 45%',
    minWidth: '300px',
    display: 'flex',
    height: '600px',
    '& .MuiDataGrid-columnHeaderCheckbox': {
      display: 'none !important',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))
