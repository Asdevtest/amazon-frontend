import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gridTemplateRows: '60px 1fr',
    gridTemplateAreas: "'navbar header' 'navbar main'",

    [theme.breakpoints.down(1024)]: {
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
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(1024)]: {
      width: '100vw',
    },
  },

  content: {
    flex: 1,
    padding: 10,
    overflow: 'auto',
  },
}))
