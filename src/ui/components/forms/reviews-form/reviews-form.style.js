import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '1643px',
  },

  btnWrapper: {},
  modalTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    gap: '25px',
    marginBottom: '30px',
  },

  userReviewTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: '#001029',
  },

  reviewsWrapper: {
    padding: '20px 30px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
  },

  closeButton: {
    width: '224px',
    height: '40px',
  },
  feedBackBtns: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },

  footerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
}))
