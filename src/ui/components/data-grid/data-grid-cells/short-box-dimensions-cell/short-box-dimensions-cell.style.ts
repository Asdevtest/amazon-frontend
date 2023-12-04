import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  shortBoxDimensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    padding: '15px 0 5px',
  },

  shortBoxDimensionsText: {
    fontSize: '14px',
    lineHeight: '16px',
  },

  alertText: {
    color: 'red',
    fontWeight: 'bold',
  },
}))
