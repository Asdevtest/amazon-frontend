import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gridTemplateRows: '60px 1fr',
    gridTemplateAreas: "'navbar header' 'navbar main'",

    [theme.breakpoints.down(768)]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '52px',
    },
  },

  wrapperShort: {
    gridTemplateColumns: '75px 1fr',
  },

  main: {
    gridArea: 'main',
    overflowY: 'auto',
    background: theme.palette.background.second,

    [theme.breakpoints.down(768)]: {
      width: '100vw',

      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },

  content: {
    padding: 10,
  },
}))
