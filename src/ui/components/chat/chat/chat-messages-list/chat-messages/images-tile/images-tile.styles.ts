/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'grid',
    width: '100%',
    height: '100%',
    maxWidth: '390px',
    maxHeight: '450px',
    gap: '5px',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'repeat(1, 1fr)',

    '& div': {
      overflow: 'hidden',
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  overlay: {
    all: 'unset',
    borderRadius: '4px',
    backgroundColor: '#000',
    opacity: '0.65',
    width: '100%',
    height: '100%',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumn: 3,
    gridRow: 3,
    fontSize: '34px',
    color: '#fff',
  },
}))
