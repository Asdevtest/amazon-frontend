import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  tableContainer: {
    width: '100%',
    height: '56vh',
  },

  tableContainerModal: {
    height: '44vh',
  },

  tableContainerSubView: {
    height: '82vh',
  },
}))
