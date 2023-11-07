import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  manyUserLinkWrapper: {
    width: '100%',
    maxWidth: 152,
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  manyUserLinkWrapperStart: {
    display: 'flex',
    justifyContent: 'start',
    paddingBottom: 5,
  },
}))
