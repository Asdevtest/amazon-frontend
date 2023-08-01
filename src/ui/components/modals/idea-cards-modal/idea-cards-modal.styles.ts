/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '1640px',
  },

  modalDialogContextClassName: {
    padding: '40px 32px 40px 50px !important',
  },
}))
