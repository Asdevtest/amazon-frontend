import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  createPresetWrapper: {
    marginTop: '10px',

    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  createPresetInput: {
    flex: 1,
  },
}))
