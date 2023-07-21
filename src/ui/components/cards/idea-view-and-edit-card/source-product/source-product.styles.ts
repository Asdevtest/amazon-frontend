/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: '15px',
  },

  sourceProductWrapper: {
    display: 'flex',
    gap: 10,
  },

  attributesProductWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}))
