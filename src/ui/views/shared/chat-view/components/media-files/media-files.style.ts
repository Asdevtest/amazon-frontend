import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    maxHeight: '400px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gap: '5px',
    borderRadius: '10px',
    overflow: 'hidden',

    '& > *': {
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  wrapperSize2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',

    '& > *:nth-child(1)': {
      gridColumn: '1',
    },
    '& > *:nth-child(2)': {
      gridColumn: '2',
    },
  },

  wrapperSize3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& > *:nth-child(1)': {
      gridRow: '1 / span 2',
    },
    '& > *:nth-child(2)': {
      gridColumn: '2',
      gridRow: '1',
    },
    '& > *:nth-child(3)': {
      gridColumn: '2',
      gridRow: '2',
    },
  },

  wrapperSize4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& > *:nth-child(1)': {
      gridRow: '1',
    },
    '& > *:nth-child(2)': {
      gridColumn: '1',
      gridRow: '2',
    },
    '& > *:nth-child(3)': {
      gridColumn: '2',
      gridRow: '1',
    },
    '& > *:nth-child(4)': {
      gridColumn: '2',
      gridRow: '2',
    },
  },

  wrapperSize5: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& > *:nth-child(1)': {
      gridRow: '1 / span 2',
    },
    '& > *:nth-child(2)': {
      gridColumn: '3',
      gridRow: '1',
    },
    '& > *:nth-child(3)': {
      gridColumn: '3',
      gridRow: '2',
    },
    '& > *:nth-child(4)': {
      gridColumn: '2',
      gridRow: '1',
    },
    '& > *:nth-child(5)': {
      gridColumn: '2',
      gridRow: '2',
    },
  },

  wrapperSize6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',

    '& > *:nth-child(1)': {
      gridColumn: '1 / span 2',
      gridRow: '1 / span 2',
    },
    '& > *:nth-child(2)': {
      gridColumn: '3',
      gridRow: '1',
    },
    '& > *:nth-child(3)': {
      gridColumn: '3',
      gridRow: '2',
    },
    '& > *:nth-child(4)': {
      gridColumn: '1',
      gridRow: '3',
    },
    '& > *:nth-child(5)': {
      gridColumn: '2',
      gridRow: '3',
    },
    '& > *:nth-child(6)': {
      gridColumn: '3',
      gridRow: '3',
    },
  },

  overlay: {
    all: 'unset',
    gridColumn: '3',
    gridRow: '3',

    backgroundColor: '#000',
    opacity: '0.65',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '34px',
    color: '#fff',
  },
}))
