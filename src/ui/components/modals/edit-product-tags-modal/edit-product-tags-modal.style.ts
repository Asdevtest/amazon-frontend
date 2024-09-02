import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  popup: {
    padding: '5px',
  },

  container: {
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  title: {
    fontWeight: 600,
  },

  tagsList: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    height: '160px',
    gap: 10,

    overflowY: 'auto',
    padding: '5px',
    borderRadius: '7px',

    boxShadow: theme.palette.boxShadow.filter,
  },

  footerModal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'flex-end',
    margin: '0 3px 5px 0',
  },

  noTagsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  noTagsText: {
    color: theme.palette.text.second,
  },

  customTag: {
    marginTop: '2px',
    marginBottom: '2px',
  },
}))
