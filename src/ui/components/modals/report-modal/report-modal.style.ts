import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 1040,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  tableContainer: {
    width: '100%',
    height: 390,
  },

  dataGridRoot: {
    '& .MuiDataGrid-columnHeaderTitleContainer': { padding: '0 !important' },
    '& .MuiDataGrid-columnHeaderDraggableContainer': { padding: '0 !important' },
  },

  inputContainer: {
    width: '20%',
  },

  textareaContainer: {
    width: '80%',
  },
}))
