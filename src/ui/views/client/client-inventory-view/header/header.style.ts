import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  buttonsSubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },

  controlButtonsWrapper: {
    display: 'flex',
    gap: '20px',
  },

  controlButtonsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '20px',
    flexWrap: 'wrap',
  },
}))
