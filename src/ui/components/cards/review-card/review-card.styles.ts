import { makeStyles } from 'tss-react/mui'

export const useReviewCardStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '100%',
    padding: '10px 0',
    borderBottom: '1px solid #EBEBEB',
  },

  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 115,
    flexWrap: 'wrap',

    [theme.breakpoints.down(656)]: {
      gap: 20,
      justifyContent: 'space-between',
    },
  },

  headerItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    fontSize: 14,
    fontWeight: 600,

    '&:last-of-type': {
      display: 'flex',
      marginLeft: 'auto',
      alignItems: 'flex-end',
      width: 'fit-content',

      p: {
        width: 'fit-content',
      },

      [theme.breakpoints.down(656)]: {
        margin: 'unset',
        alignItems: 'flex-start',
      },
    },
  },

  headerItemTitle: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
  },

  comment: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.general,
  },

  ratingEmpty: {
    color: theme.palette.text.second,
  },
}))
