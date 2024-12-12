import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  country: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '2px',
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '4px',
  },

  optionText: {
    fontSize: 12,
    lineHeight: '14px',
  },
}))
