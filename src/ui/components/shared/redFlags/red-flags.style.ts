import {makeStyles} from 'tss-react/mui'

export const useRedFlagStyles = makeStyles()(theme => ({
  saveBtn: {
    padding: '0',
    border: 'none',
    background: 'none',
    display: 'flex',
    gap: '15px',
    cursor: 'pointer',
  },
}))
