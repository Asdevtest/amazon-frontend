import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  proposalFormWrapper: {
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px',
  },

  backBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  requestInfoWrapper: {
    marginTop: '24px',
  },
  detailsWrapper: {
    marginTop: '20px',
  },
  chatWrapper: {
    marginTop: '20px',
    width: '100%',
    height: '778px',
  },
  additionalButtonsWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelRequestProposalBtn: {
    backgroundColor: '#C4C4C4',
  },

  backBtn: {
    width: '140px',
    height: '40px',
  },
}))
