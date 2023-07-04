import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    padding: 40,
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 4,
  },

  titleMembers: {
    margin: 0,
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  selectsWrapper: {
    marginTop: 30,
  },

  selectWrapper: {
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  subtitleClient: {
    margin: 0,
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '19px',
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  select: {
    width: 216,
    height: 40,
    padding: '6px 10px',

    '& > div': {
      padding: 0,
    },
  },

  saveIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  disableSelect: {
    background: theme.palette.input.customDisabled,
    cursor: 'default',
  },

  disableIcon: {
    color: theme.palette.input.customDisabled,
    cursor: 'default',
  },
}))
