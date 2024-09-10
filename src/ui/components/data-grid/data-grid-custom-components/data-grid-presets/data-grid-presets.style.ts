import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  createPresetWrapper: {
    marginTop: '10px',

    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  presetsSelect: {
    height: '28px',
    boxShadow: theme.palette.button.defaultBoxShadow,
    borderRadius: '25px',
  },
}))
