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
  flagIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,

    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
}))
