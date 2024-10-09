import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  chatInfoHeaderWrapper: {
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    boxShadow: '0px 1.09px 2.18px rgba(97, 97, 97, 0.18)',
  },
}))
