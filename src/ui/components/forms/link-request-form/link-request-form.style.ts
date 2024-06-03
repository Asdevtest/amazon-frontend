import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  tableWrapper: {
    height: 360,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  dataGridRoot: {
    '& .MuiDataGrid-columnHeaderTitleContainer': { padding: '0 !important' },
    '& .MuiDataGrid-columnHeaderDraggableContainer': { padding: '0 !important' },
  },
}))
