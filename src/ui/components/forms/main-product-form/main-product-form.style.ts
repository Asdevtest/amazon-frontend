import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '1200px', // TODO
    height: '80vh', // TODO
    // minWidth: '1200px', // TODO
    // minHeight: '600px', // TODO

    '.ant-tabs-content': {
      paddingLeft: '8px',
      position: 'static', // TODO
    },
  },
}))
