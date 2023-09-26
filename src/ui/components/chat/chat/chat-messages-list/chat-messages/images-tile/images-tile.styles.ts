import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
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
  imageTile2: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(1, 1fr)',
  },
  imageTile3: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/3',
    },
  },
  imageTile4: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/4',
    },
  },
  imageTile5: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/3',
    },
  },
  imageTile6: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/3',
    },

    '& div:nth-of-type(6)': {
      gridColumn: '3',
      gridRow: '3',
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
