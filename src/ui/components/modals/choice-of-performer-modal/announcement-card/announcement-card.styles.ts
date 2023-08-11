/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '375px',
    padding: '30px 20px 35px 20px',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    marginBottom: '40px',
    borderRadius: '7px',
  },

  selectedCard: {
    border: '1px solid #0A6FE8',
    background: `${theme.palette.background.fourth} !important`,
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
    fontSize: '14px',
    fontWeight: 400,
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

  cardCarouselWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '172px',
  },

  carouselImage: {
    width: '277px',
    height: '138px',
    objectFit: 'contain',
  },

  detailTitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  detailDescription: {
    fontSize: '14px',
    fontWeight: 600,
  },

  userLinkCustomClassNames: {
    fontSize: '14px',
    fontWeight: 600,
    color: `${theme.palette.text.general} !important`,
  },
}))
