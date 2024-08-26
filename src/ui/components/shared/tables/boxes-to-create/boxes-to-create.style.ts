import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: 300,
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

  sizesWrapper: {
    minWidth: '90px',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  sizeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  sizesSubWrapper: {
    display: 'flex',
    gap: '140px',
    marginBottom: 10,
    marginTop: 10,
  },
  itemsNotEqualTotal: {
    color: theme.palette.text.red,
  },

  itemsEqualTotal: {
    color: theme.palette.text.green,
  },
}))
