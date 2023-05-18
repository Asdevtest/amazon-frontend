/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  currentBox: {
    marginBottom: '20px',
  },

  box: {
    width: '700px',
    border: '2px solid rgba(61, 81, 112, 0.3)',
    borderRadius: '10px',
  },
}))
