import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '65vw', // for not modal view?
    height: '80vh',
    overflowY: 'auto',

    '.ant-tabs-content': {
      paddingLeft: '8px',
    },
  },
}))
