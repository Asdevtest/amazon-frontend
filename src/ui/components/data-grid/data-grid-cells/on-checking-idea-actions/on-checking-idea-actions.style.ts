import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  ideaActions: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',

    button: {
      height: 30,
    },
  },
}))
