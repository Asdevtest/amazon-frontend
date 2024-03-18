import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  selectRowCellWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '5px',
    paddingLeft: 5,
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 15,
  },

  formedCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },
}))
