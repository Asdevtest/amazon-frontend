import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  userMainWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },

  userCellAvatar: {
    width: 28,
    height: 28,
  },
}))
