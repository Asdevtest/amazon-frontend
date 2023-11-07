import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardWrapper: {
    height: 148,
    padding: '30px 20px',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },

  imagesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
  },

  cardTitle: {
    color: theme.palette.text.second,
    textAlign: 'end',
    width: '140px',
  },

  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: theme.palette.text.general,
    textAlign: 'end',
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  },
}))
