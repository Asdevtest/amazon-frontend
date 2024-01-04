import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    height: 323, // 4 default strings - await all tabs
    maxWidth: 1085,
  },

  columnHeaderTitleContainer: {
    padding: '0 !important',
  },

  toolbar: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  tableTitle: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },
}))
