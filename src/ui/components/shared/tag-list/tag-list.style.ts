import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tagsList: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    height: '160px',
    gap: 5,

    overflowY: 'auto',
    padding: '5px',
    borderRadius: '20px',

    boxShadow: theme.palette.boxShadow.filter,
    backgroundColor: theme.palette.background.general,
  },

  noTagsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  noTagsText: {
    color: theme.palette.text.second,
  },
}))
