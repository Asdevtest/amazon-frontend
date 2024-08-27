import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tags: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 3px',

    flex: 1,
    overflow: 'auto',
  },

  tagsWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}))
