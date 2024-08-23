import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  minimazed: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
  },

  linkInputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
  },

  linkInputWrapperMinimazed: {
    width: '65%',
  },

  linkInputContainer: {
    margin: 0,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  linkInput: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 20,
  },
}))
