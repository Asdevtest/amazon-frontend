import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  table: {
    marginTop: 20,
    width: '100%',
    height: '82vh',
  },

  columnHeaderTitleContainer: {
    padding: '0 !important',
  },

  toolbar: {
    padding: '0 10px',
  },

  tableTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },
}))
