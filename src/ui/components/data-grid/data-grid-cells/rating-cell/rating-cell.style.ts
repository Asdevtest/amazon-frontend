import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },

  rate: {
    li: {
      cursor: 'pointer !important',
    },
  },

  totalFeedbackWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  totalFeedback: {
    fontSize: '14px',
  },
}))
