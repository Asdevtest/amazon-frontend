import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 10,
    width: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  alignCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  select: {
    width: 225,
  },

  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  optionImage: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },

  optionText: {
    fontSize: 12,
    lineHeight: '14px',
  },

  optionIcon: {
    width: '12px !important',
    height: '12px !important',
  },

  tableContainer: {
    width: '100%',
    height: 410,
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

  checkbox: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.secondary,
  },

  requestWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  requestConatainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  requestText: {
    fontSize: 14,
    lineHeight: '19px',
  },

  requestTextSecond: {
    color: theme.palette.text.secondary,
  },

  crossButton: {
    width: '16px !important',
    height: '16px !important',
    minWidth: '16px !important',
  },

  crossIcon: {
    width: '8px !important',
    height: '8px !important',
  },
}))
