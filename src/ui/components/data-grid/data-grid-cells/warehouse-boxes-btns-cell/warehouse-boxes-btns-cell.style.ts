import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  warehouseBoxesBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    height: '100%',
    padding: '6px 0',
  },

  warehouseBoxesBtn: {
    width: 210,
    height: 30,
  },
}))
