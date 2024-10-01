import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateAreas: "'igm1'",

    '& > *:nth-of-type(1)': {
      gridArea: 'igm1',
      objectFit: 'cover',
    },
  },

  wrapperSize2: {
    display: 'grid',
    gridTemplateAreas: "'igm1 igm2'",

    '& > *:nth-of-type(1)': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      gridArea: 'igm1',
    },

    '& > *:nth-of-type(2)': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      gridArea: 'igm2',
    },
  },

  wrapperSize3: {
    display: 'grid',
    gridTemplateAreas: "'igm1 igm2' 'igm1 igm3'",

    '& > *:nth-of-type(1)': {
      gridArea: 'igm1',
    },

    '& > *:nth-of-type(2)': {
      gridArea: 'igm2',
    },

    '& > *:nth-of-type(3)': {
      gridArea: 'igm3',
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
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
}))
