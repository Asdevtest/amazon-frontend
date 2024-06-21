import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'grid',
    maxWidth: '390px',
    height: '350px',
    gap: '5px',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'repeat(1, 1fr)',

    '& div': {
      overflow: 'hidden',
    },
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      img: {
        width: '100%',
        height: '100%',
      },
      '& div': {
        width: '100%',
        height: '100%',
      },
    },
  },

  imageTile4: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/4',
      img: {
        width: '100%',
        height: '100%',
      },
      '& div': {
        width: '100%',
        height: '100%',
      },
    },
  },

  imageTile5: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/3',
      img: {
        width: '100%',
        height: '100%',
      },
      '& div': {
        width: '100%',
        height: '100%',
      },
    },
  },

  imageTile6: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',

    '& div:nth-of-type(1)': {
      gridColumn: '1/3',
      gridRow: '1/3',
      img: {
        width: '100%',
        height: '100%',
      },
      '& div': {
        width: '100%',
        height: '100%',
      },
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
