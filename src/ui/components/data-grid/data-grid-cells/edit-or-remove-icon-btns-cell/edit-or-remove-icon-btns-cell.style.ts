import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  editOrRemoveIconBtnsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '15px 0',
  },

  removeOrEditBtn: {
    padding: 0,
    height: 30,
    width: 30,

    '> svg': {
      width: 18,
      height: 18,
    },
  },
}))
