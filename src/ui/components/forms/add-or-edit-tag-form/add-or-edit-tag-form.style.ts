import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  previewTagWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  tagsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    background: `linear-gradient(to right, ${theme.palette.background.general} 50%, ${theme.palette.background.generalInverted} 50%) `,

    height: 40,
    width: '100%',
  },

  btnsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))
