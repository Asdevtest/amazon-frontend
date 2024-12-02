import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  presetItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },

  presetTitle: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  presetEmptyFavorite: {
    width: '32px',
  },

  input: {
    width: '100%',
  },
}))
