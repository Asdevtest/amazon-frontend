import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    minWidth: 'max-content',
    maxWidth: 360,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  superBoxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  superBoxIconContainer: {
    padding: '2px 7px',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 7,
  },

  superBoxIcon: {
    width: 22,
    height: 22,
  },

  superBoxText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  informationTitle: {
    color: theme.palette.text.secondary,
  },

  blueColor: {
    color: theme.palette.primary.main,
  },
}))
