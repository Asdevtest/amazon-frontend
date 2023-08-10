/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    padding: '30px 20px 35px 20px',
    flexDirection: 'column',
    gap: '15px',
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    padding: '0 30px',
  },

  detailsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 10,
  },
}))
