import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  manyUserLinkWrapper: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  manyUserLinkWrapperStart: {
    display: 'flex',
    justifyContent: 'start',
    paddingBottom: 5,
  },
}))
