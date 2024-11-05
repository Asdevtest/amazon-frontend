import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 1200,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
    gap: 20,
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

  productItems: {
    width: '550px',
    height: '600px',
    overflow: 'auto',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
