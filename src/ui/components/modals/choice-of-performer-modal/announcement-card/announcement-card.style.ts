import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 380,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 20,

    [theme.breakpoints.down(1500)]: {
      width: '30%',
    },
  },

  selectedCard: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  description: {
    height: 38,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    fontWeight: 600,
  },

  detailsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '83px',
  },

  detailsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  detailTitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  detailDescription: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize',
  },

  userLinkCustomClassNames: {
    fontSize: '14px',
    fontWeight: 600,
    color: `${theme.palette.text.general} !important`,
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  detailedDescriptionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  detailedDescription: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },
}))
