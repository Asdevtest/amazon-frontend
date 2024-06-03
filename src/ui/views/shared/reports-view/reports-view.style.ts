import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  dateRangePickerContainer: {
    position: 'relative',
  },

  dateRangePicker: {
    display: 'none',
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 7,
    boxShadow: theme.palette.boxShadow.paper,
  },

  dateRangePickerShow: {
    display: 'block',
  },

  tableContainer: {
    width: '100%',
    height: '56vh',
  },

  tableContainerModal: {
    height: '44vh',
  },
}))
