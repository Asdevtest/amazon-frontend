import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  demensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  standartText: {
    width: 190,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  alertText: {
    color: 'red',
  },
}))
