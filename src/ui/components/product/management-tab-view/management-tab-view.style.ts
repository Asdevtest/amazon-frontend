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
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 90,

    [theme.breakpoints.down(1282)]: {
      gap: 40,
    },

    [theme.breakpoints.down(768)]: {
      gap: 20,
    },
  },
}))
