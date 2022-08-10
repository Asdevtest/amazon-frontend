import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  dealsOnReviewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 52,
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: '.8',
    },
  },
  tablePanelViewText: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#006CFF',

    marginRight: '15px',
  },
}))
